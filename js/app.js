/*
 * Island Vibes - app.js
 * Data, rendering, filtering, event details and registration form logic.
 * Used on all pages; each section only runs if its elements exist on the page.
 */

// ---------- DATA: an array of event objects ----------
const events = [
  { id: 1, name: "Sunset Roots Session", artist: "Rootz Collective", genre: "Reggae", date: "2026-11-14",
    venue: "Emancipation Park, Kingston", price: 2500, seats: 120,
    description: "An evening of live roots reggae as the sun goes down over the city." },
  { id: 2, name: "Dancehall Fridays", artist: "DJ Kingston Flame", genre: "Dancehall", date: "2026-11-20",
    venue: "Mas Camp, Kingston", price: 3000, seats: 200,
    description: "The hottest dancehall selections all night with guest MCs." },
  { id: 3, name: "Afro Island Night", artist: "Lagos2Kingston Crew", genre: "Afrobeats", date: "2026-11-27",
    venue: "Seven Mile Beach, Negril", price: 3500, seats: 150,
    description: "Afrobeats and island rhythms on the sand, with a live band and DJ." },
  { id: 4, name: "Soca Splash", artist: "Carnival Vibes Band", genre: "Soca", date: "2026-12-05",
    venue: "Mas Camp, Kingston", price: 4000, seats: 250,
    description: "A high-energy soca party with costumes, colour and a live band." },
  { id: 5, name: "Gospel Praise Night", artist: "Zion Harmony Choir", genre: "Gospel", date: "2026-12-12",
    venue: "Mandeville Green, Mandeville", price: 0, seats: 300,
    description: "A free evening of uplifting gospel music for the whole family." },
  { id: 6, name: "Acoustic Yard Sessions", artist: "Mavis and the Blue Mountain Band", genre: "Reggae", date: "2026-12-18",
    venue: "Blue Mountain Retreat, St. Andrew", price: 2000, seats: 80,
    description: "An intimate acoustic set in the cool of the hills." },
  { id: 7, name: "Christmas Dancehall Clash", artist: "Sound System Showdown", genre: "Dancehall", date: "2026-12-23",
    venue: "Ocho Rios Bay Beach, St. Ann", price: 3500, seats: 180,
    description: "Top sound systems go head to head in a festive dancehall clash." },
  { id: 8, name: "Ska and Rocksteady Revival", artist: "Rude Boy Revival Band", genre: "Ska", date: "2026-12-30",
    venue: "Devon House, Kingston", price: 1500, seats: 100,
    description: "Classic ska and rocksteady brought back to life by a ten-piece band." }
];

// ---------- HELPER FUNCTIONS ----------
const MAX_TICKETS = 10;

function formatPrice(price) {
  return price === 0 ? "Free" : "J$" + price.toLocaleString();
}

function formatDate(isoDate) {
  const d = new Date(isoDate + "T00:00:00");
  return d.toLocaleDateString("en-JM", { weekday: "short", year: "numeric", month: "short", day: "numeric" });
}

function findEventById(id) {
  return events.find((ev) => ev.id === Number(id));
}

// Build one Bootstrap card for an event
function createEventCard(ev, withDetailsButton) {
  const col = document.createElement("div");
  col.className = "col-md-6 col-lg-4";

  let detailsButton = "";
  if (withDetailsButton) {
    detailsButton = `<button type="button" class="btn btn-outline-success btn-sm me-2"
        data-bs-toggle="modal" data-bs-target="#eventModal" data-event-id="${ev.id}">View details</button>`;
  }

  col.innerHTML = `
    <article class="card event-card h-100 shadow-sm">
      <div class="card-body d-flex flex-column">
        <span class="badge bg-success align-self-start mb-2">${ev.genre}</span>
        <h3 class="h5 card-title">${ev.name}</h3>
        <p class="card-text mb-1"><strong>${ev.artist}</strong></p>
        <p class="card-text text-muted mb-1">${formatDate(ev.date)}</p>
        <p class="card-text text-muted">${ev.venue}</p>
        <p class="fw-bold mt-auto">${formatPrice(ev.price)}</p>
        <div>
          ${detailsButton}
          <a href="register.html?event=${ev.id}" class="btn btn-gold btn-sm">Register</a>
        </div>
      </div>
    </article>`;
  return col;
}

// Loop through a list and draw a card for each event
function renderEvents(list, container, withDetailsButton) {
  container.innerHTML = "";
  for (const ev of list) {
    container.appendChild(createEventCard(ev, withDetailsButton));
  }
}

// ---------- ALL PAGES: footer year ----------
document.querySelectorAll(".current-year").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// ---------- HOME PAGE: featured events ----------
const featuredGrid = document.getElementById("featuredGrid");
if (featuredGrid) {
  renderEvents(events.slice(0, 3), featuredGrid, false);
}

// ---------- EVENTS PAGE: filter, search, modal ----------
const eventGrid = document.getElementById("eventGrid");
if (eventGrid) {
  const genreFilters = document.getElementById("genreFilters");
  const resultCount = document.getElementById("resultCount");
  const noResults = document.getElementById("noResults");

  let activeGenre = "All";
  let searchTerm = "";

  function applyFilters() {
    const filtered = events.filter((ev) => {
      const matchesGenre = activeGenre === "All" || ev.genre === activeGenre;
      const text = (ev.name + " " + ev.artist + " " + ev.venue).toLowerCase();
      const matchesSearch = text.includes(searchTerm);
      return matchesGenre && matchesSearch;
    });

    renderEvents(filtered, eventGrid, true);
    resultCount.textContent = `Showing ${filtered.length} of ${events.length} events`;
    noResults.classList.toggle("d-none", filtered.length > 0);
  }

  // Build the genre buttons from the data (All + each unique genre)
  const genres = ["All", ...new Set(events.map((ev) => ev.genre))];
  for (const genre of genres) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-outline-success genre-btn";
    btn.textContent = genre;
    btn.setAttribute("aria-pressed", genre === "All" ? "true" : "false");
    if (genre === "All") btn.classList.add("active");

    btn.addEventListener("click", () => {
      activeGenre = genre;
      // jQuery: update which genre button looks selected
      $(".genre-btn").removeClass("active").attr("aria-pressed", "false");
      $(btn).addClass("active").attr("aria-pressed", "true");
      applyFilters();
    });
    genreFilters.appendChild(btn);
  }

  // jQuery: live search as the user types
  $("#searchInput").on("input", function () {
    searchTerm = $(this).val().toLowerCase().trim();
    applyFilters();
  });

  // Bootstrap modal: fill it with the clicked event's details
  const eventModal = document.getElementById("eventModal");
  eventModal.addEventListener("show.bs.modal", (e) => {
    const ev = findEventById(e.relatedTarget.dataset.eventId);
    if (!ev) return;
    document.getElementById("eventModalLabel").textContent = ev.name;
    document.getElementById("modalGenre").textContent = ev.genre;
    document.getElementById("modalDescription").textContent = ev.description;
    document.getElementById("modalArtist").textContent = ev.artist;
    document.getElementById("modalDate").textContent = formatDate(ev.date);
    document.getElementById("modalVenue").textContent = ev.venue;
    document.getElementById("modalPrice").textContent = formatPrice(ev.price);
    document.getElementById("modalSeats").textContent = ev.seats;
    document.getElementById("modalRegister").href = "register.html?event=" + ev.id;
  });

  applyFilters();
}

// ---------- REGISTER PAGE: form, validation, total ----------
const registrationForm = document.getElementById("registrationForm");
if (registrationForm) {
  const eventSelect = document.getElementById("eventSelect");
  const ticketsInput = document.getElementById("tickets");
  const totalDisplay = document.getElementById("totalDisplay");
  const totalNote = document.getElementById("totalNote");
  const confirmation = document.getElementById("confirmation");
  const registrationList = document.getElementById("registrationList");
  const fieldIds = ["fullName", "email", "eventSelect", "tickets", "terms"];
  const registrations = [];

  // Fill the event dropdown from the data array
  for (const ev of events) {
    const option = document.createElement("option");
    option.value = ev.id;
    option.textContent = `${ev.name} - ${formatDate(ev.date)} (${formatPrice(ev.price)})`;
    eventSelect.appendChild(option);
  }

  // Preselect the event if we arrived from an event card (register.html?event=3)
  const preselected = new URLSearchParams(window.location.search).get("event");
  if (preselected && findEventById(preselected)) {
    eventSelect.value = preselected;
  }

  // Calculator: update the visible total
  function updateTotal() {
    const ev = findEventById(eventSelect.value);
    const tickets = parseInt(ticketsInput.value, 10);

    if (!ev) {
      totalDisplay.textContent = "J$0";
      totalNote.textContent = "Choose an event to see the price.";
      return;
    }
    if (!Number.isInteger(tickets) || tickets < 1) {
      totalDisplay.textContent = "J$0";
      totalNote.textContent = "Enter a valid number of tickets.";
      return;
    }
    const total = ev.price * tickets;
    totalDisplay.textContent = formatPrice(total);
    totalNote.textContent = `${tickets} x ${formatPrice(ev.price)} for ${ev.name}`;
  }

  // Validation: returns an object of error messages (empty = valid)
  function validateRegistration(values) {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (values.fullName.length < 2) {
      errors.fullName = "Please enter your full name (at least 2 characters).";
    }
    if (!emailPattern.test(values.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (values.eventId === "") {
      errors.eventSelect = "Please choose an event.";
    }
    if (!Number.isInteger(values.tickets) || values.tickets < 1 || values.tickets > MAX_TICKETS) {
      errors.tickets = `Tickets must be a whole number from 1 to ${MAX_TICKETS}.`;
    }
    if (!values.terms) {
      errors.terms = "You must agree to the terms to register.";
    }
    return errors;
  }

  // Show or clear the error message under each field
  function showErrors(errors) {
    for (const id of fieldIds) {
      const input = document.getElementById(id);
      const feedback = document.getElementById(id + "Error");
      if (errors[id]) {
        input.classList.add("is-invalid");
        feedback.textContent = errors[id];
      } else {
        input.classList.remove("is-invalid");
        feedback.textContent = "";
      }
    }
  }

  function renderRegistrations() {
    registrationList.innerHTML = "";
    for (const reg of registrations) {
      const li = document.createElement("li");
      li.textContent = `${reg.name}: ${reg.tickets} ticket(s) for ${reg.eventName}`;
      registrationList.appendChild(li);
    }
  }

  eventSelect.addEventListener("change", updateTotal);
  ticketsInput.addEventListener("input", updateTotal);

  // Form submit handler
  registrationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const values = {
      fullName: document.getElementById("fullName").value.trim(),
      email: document.getElementById("email").value.trim(),
      eventId: eventSelect.value,
      tickets: parseInt(ticketsInput.value, 10),
      terms: document.getElementById("terms").checked
    };

    const errors = validateRegistration(values);
    showErrors(errors);

    if (Object.keys(errors).length > 0) {
      confirmation.classList.add("d-none");
      const firstInvalid = registrationForm.querySelector(".is-invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Success
    const ev = findEventById(values.eventId);
    registrations.push({ name: values.fullName, eventName: ev.name, tickets: values.tickets });
    renderRegistrations();

    confirmation.textContent =
      `Thank you, ${values.fullName}! You registered ${values.tickets} ticket(s) for ${ev.name} ` +
      `on ${formatDate(ev.date)}. Total: ${formatPrice(ev.price * values.tickets)}. ` +
      `A confirmation will be sent to ${values.email}.`;
    confirmation.classList.remove("d-none");

    bootstrap.Toast.getOrCreateInstance(document.getElementById("successToast")).show();

    registrationForm.reset();
    showErrors({});
    updateTotal();
  });

  updateTotal();
}
