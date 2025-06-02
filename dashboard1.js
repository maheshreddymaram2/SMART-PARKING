document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const profileImg = document.getElementById("profile-img");
  const userNameElem = document.getElementById("user-name");
  const userEmailElem = document.getElementById("user-email");
  const profileName = document.getElementById("profile-name");
  const profileEmail = document.getElementById("profile-email");
  const profileVehicleType = document.getElementById("profile-vehicle-type");
  const profileVehicleNumber = document.getElementById("profile-vehicle-number");
  const profileModelName = document.getElementById("profile-model-name");
  const profileParkingPreference = document.getElementById("profile-parking-preference");

  const adminLinksContainer = document.getElementById("admin-links");
  const userOnlyLinks = document.querySelectorAll(".user-only");
  const sections = document.querySelectorAll(".dashboard-section");
  const navLinks = document.querySelectorAll(".nav-link");

  // Determine if user is admin
  let isAdmin = false;
  let currentUser = null;

  // Fetch currentUser from localStorage
  const currentUserRaw = localStorage.getItem("currentUser");
  if (currentUserRaw) {
    currentUser = JSON.parse(currentUserRaw);
  }

  // Check admin login flag from sessionStorage
  const adminLoggedIn = sessionStorage.getItem("adminLoggedIn");

  if (adminLoggedIn === "true") {
    isAdmin = true;
  } else if (currentUser) {
    isAdmin = false;
  } else {
    alert("Please login first.");
    window.location.href = "login.html";
    return;
  }

  // Apply theme and show/hide links based on role
  if (isAdmin) {
    adminLinksContainer.style.display = "block";
    userOnlyLinks.forEach(el => (el.style.display = "none"));

    // Add admin theme class, remove user theme if present
    document.body.classList.add("admin-dashboard-theme");
    document.body.classList.remove("user-dashboard-theme");

    userNameElem.textContent = "Admin";
    userEmailElem.textContent = "admin@smartparking.com";
    profileImg.src = "../images/admin-profile.png"; // default admin image
  } else {
    adminLinksContainer.style.display = "none";
    userOnlyLinks.forEach(el => (el.style.display = "block"));

    // Add user theme class, remove admin theme if present
    document.body.classList.add("user-dashboard-theme");
    document.body.classList.remove("admin-dashboard-theme");

    userNameElem.textContent = currentUser.name || "User";
    userEmailElem.textContent = currentUser.email || "";

    profileName.textContent = currentUser.name || "";
    profileEmail.textContent = currentUser.email || "";
    profileVehicleType.textContent = currentUser.vehicleType || "";
    profileVehicleNumber.textContent = currentUser.vehicleNumber || "";
    profileModelName.textContent = currentUser.modelName || "";
    profileParkingPreference.textContent = currentUser.parkingPreference || "";

    profileImg.src = "../images/user-profile.png"; // default user image
  }

  // Navigation handling
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      const targetId = link.getAttribute("href").substring(1);

      sections.forEach(section => {
        section.style.display = "none";
        section.classList.remove("active-section");
      });

      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.style.display = "block";
        targetSection.classList.add("active-section");
      }

      if (targetId === "booking-details" && !isAdmin) {
        loadBookingHistory();
      }
    });
  });

  // Logout functionality
  const logoutLink = document.getElementById("logout-link");
  logoutLink.addEventListener("click", e => {
    e.preventDefault();
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("adminLoggedIn");
    alert("You have been logged out.");
    window.location.href = "login.html";
  });

  // Load user's booking history
  function loadBookingHistory() {
    const bookingHistoryDiv = document.getElementById("booking-history");
    bookingHistoryDiv.innerHTML = "";

    const bookingsRaw = localStorage.getItem("bookings");
    if (!bookingsRaw) {
      bookingHistoryDiv.textContent = "No bookings found.";
      return;
    }

    const bookings = JSON.parse(bookingsRaw);
    const userBookings = bookings.filter(b => b.userEmail === currentUser.email);

    if (userBookings.length === 0) {
      bookingHistoryDiv.textContent = "No bookings found.";
      return;
    }

    userBookings.forEach(booking => {
      const div = document.createElement("div");
      div.classList.add("booking-item");
      div.innerHTML = `
        <p><strong>Slot Number:</strong> ${booking.slotNumber}</p>
        <p><strong>Date:</strong> ${booking.date}</p>
        <p><strong>Time:</strong> ${booking.time}</p>
        <p><strong>Status:</strong> ${booking.status}</p>
        <hr>
      `;
      bookingHistoryDiv.appendChild(div);
    });
  }

  // Default to show dashboard section on load
  document.getElementById("dashboard").style.display = "block";
});
