# Island Vibes

A responsive, multi-page website for Jamaican music and events. Visitors can browse and filter events, view details, and register for tickets.

**Course:** Dynamic Websites and Applications (Lecturer: Trevoir Williams)
**Student:** Jahmeil Whyte
**Student ID:** 2401010918

## Purpose and audience

Island Vibes is for music fans in Jamaica and visitors who want to find reggae, dancehall, soca, afrobeats, gospel and ska events and register quickly.

## Pages

|Page|File|Purpose|
|-|-|-|
|Home|`index.html`|Hero section, featured events, why Island Vibes, FAQ|
|Events|`events.html`|All events with genre filter, search and details modal|
|Register|`register.html`|Validated registration form with live ticket total|

## Technologies used

* **HTML5** with semantic elements (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`)
* **CSS3** (`css/styles.css`) for the Jamaican colour theme, focus styles and card hover effect
* **Bootstrap 5.3** (via CDN) for the navbar, grid, cards, buttons, forms and utilities
* **JavaScript** (`js/app.js`)
* **jQuery 3.7** (via CDN)
* **Git and GitHub** for version control

## Bootstrap JavaScript components

1. **Modal** - the "View details" button opens a modal that JavaScript fills with the selected event's data.
2. **Toast** - shown after a successful registration.
3. **Accordion / Collapse** - the FAQ section on the home page (the navbar also uses Collapse on small screens).

## JavaScript concepts demonstrated

* **Variables and data types:** `const` and `let`; strings (names), numbers (prices, tickets) and booleans (checkbox, filters).
* **Array and objects:** the `events` array holds objects with id, name, artist, genre, date, venue, price, seats and description.
* **Conditions:** validation rules, "Free" pricing, showing or hiding the "no results" message.
* **Functions:** `formatPrice`, `createEventCard`, `renderEvents`, `applyFilters`, `validateRegistration`, `updateTotal` and others.
* **Iteration:** `for...of` loops and `filter`/`map` to build cards, genre buttons and the event dropdown.
* **DOM selection and modification:** `getElementById`, `querySelector`, `textContent`, `classList`, `appendChild`.
* **Events:** click, input, change, submit and the Bootstrap `show.bs.modal` event.

## jQuery

Two meaningful uses on the Events page:

* `$("#searchInput").on("input", ...)` reads the search box and filters the events as the user types.
* `$(".genre-btn").removeClass("active")` and `$(btn).addClass("active")` highlight the selected genre button.

## Interactive workflows

* **Category filter and live search** on the Events page.
* **Details modal** populated by JavaScript.
* **Quantity selector** that updates the total price on the Register page.
* **Form validation** with visible error messages, a confirmation message and a toast.

## Form and validation

The registration form reads values with JavaScript on submit and checks that: the name has at least 2 characters, the email is valid, an event is chosen, tickets are a whole number from 1 to 10, and the terms box is ticked. Errors appear under each field and focus moves to the first problem. On success a confirmation message and toast are shown.

## Accessibility and responsive design

Skip link, labelled form controls, alt text on the hero image, visible focus outlines, keyboard-friendly Bootstrap components and `aria-live` result messages. Layout uses the Bootstrap grid and was tested at desktop, tablet and mobile widths.

## Project structure

```
island-vibes-website/
├── index.html
├── events.html
├── register.html
├── css/styles.css
├── js/app.js
├── images/hero.svg
└── README.md
```

## How to run

Download or clone the repository and open `index.html` in a browser (an internet connection is needed for the Bootstrap and jQuery CDNs).

## AI use disclosure

I used an AI assistant (Claude) as a development aid for brainstorming the project 

