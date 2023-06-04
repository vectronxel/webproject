// Login form
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", event => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  login(email, password);
});

// Signup form
const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    console.error("Password and Confirm Password do not match.");
    return;
  }

  register(name, email, phone, password);
});

// Fetch events
const fetchEvents = () => {
  const eventsList = document.getElementById("events-list");

  // Clear existing event items
  eventsList.innerHTML = "";

  // Fetch events from the database
  database.ref("events").on("value", snapshot => {
    const events = snapshot.val();
    for (let eventId in events) {
      const event = events[eventId];
      const eventItem = document.createElement("div");
      eventItem.classList.add("event-item");
      eventItem.innerHTML = `
        <h3>${event.name}</h3>
        <p>Organized by: ${event.organizer}</p>
        <p>Date: ${event.date}</p>
        <p>Venue: ${event.venue}</p>
        <p>Price: ${event.price}</p>
      `;
      eventsList.appendChild(eventItem);
    }
  });
};

// Call fetchEvents function to populate the events listing page
fetchEvents();

// Check if a user is authenticated
auth.onAuthStateChanged(user => {
  const adminInterface = document.getElementById("admin-interface");
  const adminName = document.getElementById("admin-name");
  const eventForm = document.getElementById("event-form");
  const eventList = document.getElementById("event-list");

  if (user) {
    adminInterface.style.display = "block"; // Show admin interface for authenticated users
    adminName.textContent = user.displayName;

    // Event creation
    eventForm.addEventListener("submit", event => {
      event.preventDefault();

      const eventName = document.getElementById("event-name").value;
      const organizer = document.getElementById("organizer").value;
      const date = document.getElementById("date").value;
      const venue = document.getElementById("venue").value;
      const price = document.getElementById("price").value;

      // Save the event to the database
      database.ref("events").push({
        name: eventName,
        organizer: organizer,
        date: date,
        venue: venue,
        price: price
      })
        .then(() => {
          console.log("Event created successfully.");
          eventForm.reset();
        })
        .catch(error => {
          console.error("Event creation failed.", error);
        });
    });

    // Fetch and display events
    database.ref("events").on("value", snapshot => {
      const events = snapshot.val();
      eventList.innerHTML = "";
      for (let eventId in events) {
        const event = events[eventId];
        const eventItem = document.createElement("div");
        eventItem.classList.add("event-item");
        eventItem.innerHTML = `
          <h3>${event.name}</h3>
          <p>Organized by: ${event.organizer}</p>
          <p>Date: ${event.date}</p>
          <p>Venue: ${event.venue}</p>
          <p>Price: ${event.price}</p>
          <div class="event-actions">
            <button class="edit-btn" onclick="editEvent('${eventId}')"><i class="fas fa-edit"></i></button>
            <button class="delete-btn" onclick="deleteEvent('${eventId}')"><i class="fas fa-trash"></i></button>
          </div>
        `;
        eventList.appendChild(eventItem);
      }
    });
  } else {
    adminInterface.style.display = "none"; // Hide admin interface for unauthenticated users
  }
});

// Event deletion
const deleteEvent = eventId => {
  if (confirm("Are you sure you want to delete this event?")) {
    database.ref("events").child(eventId).remove()
      .then(() => {
        console.log("Event deleted successfully.");
      })
      .catch(error => {
        console.error("Event deletion failed.", error);
      });
  }
};

// Event editing (Not implemented in this basic example)
const editEvent = eventId => {
  // Implement your logic for editing an event here
};
