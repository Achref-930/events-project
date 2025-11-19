// Events Data
const events = [
  {
    id: 0,
    title: "bachelor party",
    category: "weddings",
    date: "Nov 10, 2025",
    location: "Downtown Club",
    price: "$5000",
    image:"https://plus.unsplash.com/premium_photo-1663088957773-85506710740b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Celebrate the groom's last night of freedom in style.",
  },
  {
    id: 1,
    title: "engagement party",
    category: "weddings",
    date: "Dec 15, 2025",
    location: "Sunset Gardens",
    price: "$7000",
    image:
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Celebrate your engagement in a beautiful garden setting.",
  },
  {
    id: 3,
    title: "Summer Music Festival",
    category: "music",
    date: "Dec 20, 2024",
    location: "Central Park",
    price: "$50",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&h=300&fit=crop",
    description:
      "Join us for an amazing outdoor music festival featuring top artists.",
  },
  {
    id: 4,
    title: "Tech Conference 2024",
    category: "conference",
    date: "Dec 25, 2024",
    location: "Convention Center",
    price: "$150",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop",
    description: "Learn from industry leaders about the latest in technology.",
  },
  {
    id: 5,
    title: "Photography Workshop",
    category: "workshop",
    date: "Jan 5, 2025",
    location: "Studio 42",
    price: "$80",
    image:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=500&h=300&fit=crop",
    description: "Master the art of photography with professional guidance.",
  },
  {
    id: 5,
    title: "Marathon Championship",
    category: "sports",
    date: "Jan 15, 2025",
    location: "City Stadium",
    price: "$30",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&h=300&fit=crop",
    description: "Watch or participate in the biggest marathon of the year.",
  },
  {
    id: 6,
    title: "Jazz Night Live",
    category: "music",
    date: "Jan 22, 2025",
    location: "Blue Note Club",
    price: "$45",
    image:
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=500&h=300&fit=crop",
    description: "An intimate evening with legendary jazz performers.",
  },
  {
    id: 7,
    title: "Digital Marketing Summit",
    category: "conference",
    date: "Feb 1, 2025",
    location: "Hilton Hotel",
    price: "$200",
    image:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=500&h=300&fit=crop",
    description: "Learn cutting-edge marketing strategies from experts.",
  },
];

let bookings = [];
let currentEvent = null;

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  displayEvents("all");
  updateStats();
  setupEventListeners();
});

// Display Events
function displayEvents(category) {
  const container = document.getElementById("eventsContainer");
  const filteredEvents =
    category === "all" ? events : events.filter((e) => e.category === category);

  container.innerHTML = filteredEvents
    .map(
      (event) => `
        <div class="col-md-4 col-sm-6 event-item" data-category="${event.category}">
            <div class="card event-card">
                <div class="position-relative overflow-hidden">
                    <img src="${event.image}" class="card-img-top" alt="${event.title}">
                    <span class="badge-category">${event.category}</span>
                </div>
                <div class="card-body">
                    <h5 class="card-title fw-bold">${event.title}</h5>
                    <p class="card-text text-muted small">${event.description}</p>
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <span><i class="fas fa-calendar text-primary"></i> ${event.date}</span>
                        <span><i class="fas fa-map-marker-alt text-primary"></i> ${event.location}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="h5 text-primary mb-0">${event.price}</span>
                        <button class="btn btn-primary btn-sm" onclick="openBookingModal(${event.id})">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

// Change Theme Based on Category
function changeTheme(category) {
  const body = document.body;
  const hero = document.querySelector(".hero");
  const navbar = document.querySelector(".navbar");
  const footer = document.getElementById("mainFooter");

  // Remove all theme classes
  body.classList.remove(
    "theme-all",
    "theme-music",
    "theme-conference",
    "theme-workshop",
    "theme-sports"
  );

  // Add new theme class
  body.classList.add(`theme-${category}`);

  // Update navbar shadow color
  if (navbar) {
    navbar.style.boxShadow = `0 2px 20px ${getCategoryColor(category)}22`;
  }

  // Add visual feedback with a subtle animation
  hero.style.transform = "scale(0.98)";
  setTimeout(() => {
    hero.style.transform = "scale(1)";
  }, 300);
}

// Get category color for dynamic effects
function getCategoryColor(category) {
  const colors = {
    all: "#6366f1",
    music: "#ec4899",
    conference: "#3b82f6",
    workshop: "#10b981",
    sports: "#f59e0b",
  };
  return colors[category] || colors["all"];
}

// Setup Event Listeners
function setupEventListeners() {
  // Filter buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      const category = this.dataset.category;
      displayEvents(category);
      changeTheme(category);
    });
  });

  // Confirm booking
  document
    .getElementById("confirmBookingBtn")
    .addEventListener("click", confirmBooking);

  // View bookings
  document
    .getElementById("viewBookingsBtn")
    .addEventListener("click", function (e) {
      e.preventDefault();
      showMyBookings();
    });
}

// Open Booking Modal
function openBookingModal(eventId) {
  currentEvent = events.find((e) => e.id === eventId);
  document.getElementById("modalEventTitle").textContent = currentEvent.title;
  document.getElementById("bookingForm").style.display = "block";
  document.getElementById("bookingSuccess").style.display = "none";
  document.getElementById("confirmBookingBtn").style.display = "block";

  // Reset form
  document.getElementById("bookingName").value = "";
  document.getElementById("bookingEmail").value = "";
  document.getElementById("bookingTickets").value = "1";
  document.getElementById("bookingPhone").value = "";

  new bootstrap.Modal(document.getElementById("bookingModal")).show();
}

// Confirm Booking
function confirmBooking() {
  const name = document.getElementById("bookingName").value;
  const email = document.getElementById("bookingEmail").value;
  const tickets = document.getElementById("bookingTickets").value;
  const phone = document.getElementById("bookingPhone").value;

  if (!name || !email) {
    alert("Please fill in all required fields");
    return;
  }

  const booking = {
    id: Date.now(),
    event: currentEvent,
    name: name,
    email: email,
    tickets: tickets,
    phone: phone,
    bookingDate: new Date().toLocaleString(),
  };

  bookings.push(booking);

  document.getElementById("bookingForm").style.display = "none";
  document.getElementById("bookingSuccess").style.display = "block";
  document.getElementById("confirmBookingBtn").style.display = "none";

  updateStats();

  setTimeout(() => {
    bootstrap.Modal.getInstance(document.getElementById("bookingModal")).hide();
  }, 2000);
}

// Show My Bookings
function showMyBookings() {
  const bookingsList = document.getElementById("bookingsList");

  if (bookings.length === 0) {
    bookingsList.innerHTML =
      '<p class="text-center text-muted">You haven\'t made any bookings yet.</p>';
  } else {
    bookingsList.innerHTML = bookings
      .map(
        (booking) => `
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-8">
                            <h6 class="fw-bold">${booking.event.title}</h6>
                            <p class="mb-1"><strong>Name:</strong> ${booking.name}</p>
                            <p class="mb-1"><strong>Email:</strong> ${booking.email}</p>
                            <p class="mb-1"><strong>Tickets:</strong> ${booking.tickets}</p>
                            <p class="mb-1 text-muted small">Booked on: ${booking.bookingDate}</p>
                        </div>
                        <div class="col-md-4 text-end">
                            <span class="badge bg-success">Confirmed</span>
                            <p class="mt-2 mb-0"><strong>${booking.event.price}</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        `
      )
      .join("");
  }

  new bootstrap.Modal(document.getElementById("myBookingsModal")).show();
}

// Update Stats
function updateStats() {
  document.getElementById("totalEvents").textContent = events.length;
  document.getElementById("totalBookings").textContent = bookings.length;
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
