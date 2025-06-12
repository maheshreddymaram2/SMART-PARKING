// Define parking slots for each location and vehicle type
const parkingData = {
    location1: { car: 20, bike: 80, truck: 0 },
    location2: { car: 40, bike: 50, truck: 10 },
    location3: { car: 30, bike: 10, truck: 60 }
};

const fareRates = { car: 20, bike: 10, truck: 30 };
let selectedSlots = [];

function generateParkingGrid(location, vehicleType) {
    const grid = document.getElementById("parking-grid");
    grid.innerHTML = '';
    selectedSlots = [];

    const availableSlots = parkingData[location][vehicleType];
    const totalSlots = 100;

    for (let i = 0; i < totalSlots; i++) {
        const slot = document.createElement("div");
        slot.classList.add("slot");

        // Slot label e.g., A1, B5, etc.
        const rowLabel = String.fromCharCode(65 + Math.floor(i / 10)); // A-J
        const colLabel = (i % 10) + 1;
        slot.dataset.label = `${rowLabel}${colLabel}`;
        slot.textContent = `${rowLabel}${colLabel}`;

        if (i < availableSlots) {
            slot.classList.add("available");

            slot.addEventListener("click", () => {
                if (slot.classList.contains("selected")) {
                    slot.classList.remove("selected");
                    selectedSlots = selectedSlots.filter(label => label !== slot.dataset.label);
                } else {
                    if (selectedSlots.length >= 5) {
                        alert("You can select a maximum of 5 slots only.");
                        return;
                    }
                    slot.classList.add("selected");
                    selectedSlots.push(slot.dataset.label);
                }

                document.getElementById("selected-count").textContent = selectedSlots.length;
                calculateFare();
            });
        } else if (i < availableSlots + 20) {
            slot.classList.add("reserved");
        } else {
            slot.classList.add("booked");
        }

        grid.appendChild(slot);
    }
}

// Show grid when both vehicle and location are selected
document.getElementById("parking-location").addEventListener("change", handleSelection);
document.getElementById("vehicle-type").addEventListener("change", handleSelection);
document.getElementById("entry-time").addEventListener("change", calculateFare);
document.getElementById("exit-time").addEventListener("change", calculateFare);

function handleSelection() {
    const location = document.getElementById("parking-location").value;
    const vehicleType = document.getElementById("vehicle-type").value;

    if (location && vehicleType) {
        document.getElementById("parking-grid-container").style.display = "block";
        document.getElementById("selected-count").textContent = "0";
        generateParkingGrid(location, vehicleType);
    }
}

function calculateFare() {
    const entryTime = document.getElementById("entry-time").value;
    const exitTime = document.getElementById("exit-time").value;
    const vehicleType = document.getElementById("vehicle-type").value;

    if (!entryTime || !exitTime || !vehicleType || selectedSlots.length === 0) return;

    const start = new Date(`1970-01-01T${entryTime}:00`);
    const end = new Date(`1970-01-01T${exitTime}:00`);
    let hours = (end - start) / (1000 * 60 * 60);
    if (hours < 0) hours += 24; // Overnight correction

    const duration = Math.ceil(hours);
    const totalFare = fareRates[vehicleType] * duration * selectedSlots.length;

    document.getElementById("fare-display").style.display = "block";
    document.getElementById("duration-hours").textContent = duration;
    document.getElementById("calculated-fare").textContent = totalFare;
}

// Booking Form Submission
document.getElementById("parking-form").addEventListener("submit", (event) => {
    event.preventDefault();

    if (selectedSlots.length === 0) {
        alert("Please select at least one parking slot.");
        return;
    }

    const selectedDate = document.getElementById("date").value;
    const today = new Date();
    const bookingDate = new Date(selectedDate);
    today.setHours(0, 0, 0, 0);

    if (bookingDate < today) {
        alert("Please select a valid future date.");
        return;
    }

    const bookingData = {
        location: document.getElementById("parking-location").value,
        vehicleType: document.getElementById("vehicle-type").value,
        date: selectedDate,
        entryTime: document.getElementById("entry-time").value,
        exitTime: document.getElementById("exit-time").value,
        selectedSlots,
        duration: parseInt(document.getElementById("duration-hours").textContent),
        totalFare: parseInt(document.getElementById("calculated-fare").textContent)
    };

    // Store booking in localStorage
    localStorage.setItem("bookingInfo", JSON.stringify(bookingData));

    document.getElementById("booking-success").style.display = "block";

    setTimeout(() => {
        window.location.href = "receipt.html";
    }, 2000);
});
