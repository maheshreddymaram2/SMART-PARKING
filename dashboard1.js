document.addEventListener("DOMContentLoaded", function () {
    // Fake data for demonstration
    const fakeUserData = {
        name: "John Doe",
        email: "john.doe@example.com",
        vehicleType: "Car",
        vehicleNumber: "ABC123",
        modelName: "Toyota Corolla",
        parkingPreference: "Near Entrance",
        bookings: [
            { id: 1, date: "2025-03-20", spot: "A1", status: "Confirmed", fare: "$5" },
            { id: 2, date: "2025-03-21", spot: "B2", status: "Pending", fare: "$4" }
        ]
    };

    // Display user name on sidebar
    const userNameDisplay = document.getElementById("user-name");
    userNameDisplay.textContent = fakeUserData.name;

    // Check if the user is admin
    const adminEmail = "admin@smartparking.com";
    const adminLinks = document.getElementById("admin-links");

    if (fakeUserData.email === adminEmail) {
        adminLinks.style.display = "block"; // Show admin links (Reports, Earnings)
    }

    // Handle Sidebar Navigation
    const dashboardSection = document.getElementById("dashboard");
    const profileSection = document.getElementById("profile");
    const bookParkingSection = document.getElementById("book-parking");
    const cancelBookingSection = document.getElementById("cancel-booking");
    const bookingDetailsSection = document.getElementById("booking-details");
    const ticketFareSection = document.getElementById("ticket-fare");

    // Button clicks to show corresponding sections
    document.querySelector("a[href='#dashboard']").addEventListener("click", function () {
        showSection(dashboardSection);
    });

    document.querySelector("a[href='#profile']").addEventListener("click", function () {
        showSection(profileSection);
        displayProfile(fakeUserData); // Display profile data
    });

    document.querySelector("a[href='#book-parking']").addEventListener("click", function () {
        showSection(bookParkingSection);
        displayBookingForm(); // Display booking form
    });

    document.querySelector("a[href='#cancel-booking']").addEventListener("click", function () {
        showSection(cancelBookingSection);
        displayCancelBookingForm(fakeUserData.bookings); // Display cancel booking options
    });

    document.querySelector("a[href='#booking-details']").addEventListener("click", function () {
        showSection(bookingDetailsSection);
        displayBookingDetails(fakeUserData.bookings); // Display current bookings
    });

    document.querySelector("a[href='#ticket-fare']").addEventListener("click", function () {
        showSection(ticketFareSection);
        displayTicketFare(); // Display ticket fare details
    });

    // Logout function
    document.querySelector("a[href='#logout']").addEventListener("click", function () {
        localStorage.removeItem("currentUser"); // Remove current user from localStorage
        window.location.href = "../html/login.html"; // Redirect to login page
    });

    // Show specific section by hiding others
    function showSection(section) {
        const sections = document.querySelectorAll(".dashboard-section");
        sections.forEach(sec => sec.style.display = "none");
        section.style.display = "block";
    }

    // Display Profile Information
    function displayProfile(userData) {
        profileSection.innerHTML = `
            <h3>User Profile</h3>
            <p>Name: ${userData.name}</p>
            <p>Email: ${userData.email}</p>
            <p>Vehicle Type: ${userData.vehicleType}</p>
            <p>Vehicle Number: ${userData.vehicleNumber}</p>
            <p>Model: ${userData.modelName}</p>
            <p>Parking Preference: ${userData.parkingPreference}</p>
        `;
    }

    // Display Booking Form (for booking parking)
    function displayBookingForm() {
        bookParkingSection.innerHTML = `
            <h3>Book Parking</h3>
            <form id="booking-form">
                <label for="date">Date: </label>
                <input type="date" id="date" name="date">
                <label for="spot">Parking Spot: </label>
                <input type="text" id="spot" name="spot">
                <label for="fare">Fare: </label>
                <input type="text" id="fare" name="fare" value="$5" disabled>
                <button type="submit">Book Parking</button>
            </form>
        `;
        document.getElementById("booking-form").addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Parking Booked!");
            // Logic to save the new booking can be added here
        });
    }

    // Display Cancel Booking Form
    function displayCancelBookingForm(bookings) {
        cancelBookingSection.innerHTML = "<h3>Cancel Booking</h3>";
        bookings.forEach(booking => {
            cancelBookingSection.innerHTML += `
                <div>
                    <p>Booking ID: ${booking.id} - Spot: ${booking.spot} - Date: ${booking.date} - Status: ${booking.status}</p>
                    <button onclick="cancelBooking(${booking.id})">Cancel Booking</button>
                </div>
            `;
        });
    }

    // Handle Cancel Booking
    function cancelBooking(bookingId) {
        alert(`Booking with ID: ${bookingId} has been canceled.`);
        // Logic to remove or update the booking can be added here
    }

    // Display Booking Details
    function displayBookingDetails(bookings) {
        bookingDetailsSection.innerHTML = "<h3>Your Bookings</h3>";
        bookings.forEach(booking => {
            bookingDetailsSection.innerHTML += `
                <div>
                    <p>Booking ID: ${booking.id} - Spot: ${booking.spot} - Date: ${booking.date} - Status: ${booking.status} - Fare: ${booking.fare}</p>
                </div>
            `;
        });
    }

    // Display Ticket Fare Information
    function displayTicketFare() {
        ticketFareSection.innerHTML = `
            <h3>Ticket Fare</h3>
            <p>Hourly Fare: $5</p>
            <p>Daily Fare: $20</p>
            <p>Monthly Fare: $150</p>
        `;
    }

    // Show the Dashboard section on page load
    showSection(dashboardSection);
});

