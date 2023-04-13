const BASE_URL = "http://localhost:3000/films";
const filmsUrl = `${BASE_URL}/films`;

document.addEventListener("DOMContentLoaded", function() {

    // Get a reference to the "films" ul element in the HTML
    const filmsList = document.querySelector("#films");
  
    // Make a GET request to the "/films" endpoint to retrieve a list of all films
    fetch("http://localhost:3000/films")
      .then(res => res.json())
      .then(films => {
        // Iterate through each film object in the array of films
        films.forEach(film => {
          // Create a new li element to represent the film in the films list
          const filmListItem = document.createElement("li");
          filmListItem.classList.add("film", "item");
  
          // Create a new img element to display the film poster
          const filmPoster = document.createElement("img");
          filmPoster.src = film.poster;
          filmPoster.alt = `Poster for ${film.title}`;
          filmListItem.appendChild(filmPoster);
  
          // Create a new h2 element to display the film title
          const filmTitle = document.createElement("h2");
          filmTitle.textContent = film.title;
          filmListItem.appendChild(filmTitle);
  
          // Create a new p element to display the film runtime
          const filmRuntime = document.createElement("p");
          filmRuntime.textContent = `${film.runtime} min`;
          filmListItem.appendChild(filmRuntime);
  
          // Create a new p element to display the film showtime
          const filmShowtime = document.createElement("p");
          filmShowtime.textContent = `Showtime: ${film.showtime}`;
          filmListItem.appendChild(filmShowtime);
  
          // Create a new p element to display the number of available tickets
          let ticketsAvailable = film.capacity - film.tickets_sold;
          const filmTickets = document.createElement("p");
          filmTickets.textContent = `${ticketsAvailable} tickets available`;
          filmListItem.appendChild(filmTickets);
  
          // Create a new button element to buy a ticket for the film
          const buyTicketButton = document.createElement("button");
          buyTicketButton.textContent = "Buy Ticket";
          filmListItem.appendChild(buyTicketButton);
  
          // Add a click event listener to the buy ticket button
          buyTicketButton.addEventListener("click", function() {
            // If there are no tickets available, alert the user and return early
            if (ticketsAvailable === 0) {
              alert("Sorry, this showing is sold out!");
              return;
            }
          
            // Decrease the number of tickets available and update the display
            ticketsAvailable--;
            filmTickets.textContent = `${ticketsAvailable} tickets available`;
          
            // Make a PUT request to update the tickets_sold property of the film
            fetch(`${filmsUrl}/${film.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                tickets_sold: film.tickets_sold + 1
              })
            })
            .then(res => res.json())
            .then(updatedFilm => {
              // Update the film object with the updated tickets_sold value
              film.tickets_sold = updatedFilm.tickets_sold;
            })
            .catch(err => console.log(err));
          });
          
          
          // Add the film li element to the films ul element
          filmsList.appendChild(filmListItem);
        });
      });
  });
  