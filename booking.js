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

        // Generate label like A1, A2, ..., J10
        const rowLabel = String.fromCharCode(65 + Math.floor(i / 10)); // A-J
        const colLabel = (i % 10) + 1;
        slot.dataset.label = `${rowLabel}${colLabel}`;
        slot.textContent = `${rowLabel}${colLabel}`;

        if (i < availableSlots) {
            slot.classList.add("available");

            // Make available slots selectable
            slot.addEventListener("click", function () {
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

// Show grid when both fields are selected
document.getElementById("parking-location").addEventListener("change", handleSelection);
document.getElementById("vehicle-type").addEventListener("change", handleSelection);
document.getElementById("entry-time").addEventListener("change", calculateFare);
document.getElementById("exit-time").addEventListener("change", calculateFare);

function handleSelection() {
    const location = document.getElementById("parking-location").value;
    const vehicle = document.getElementById("vehicle-type").value;

    if (location && vehicle) {
        document.getElementById("parking-grid-container").style.display = "block";
        document.getElementById("selected-count").textContent = "0";
        generateParkingGrid(location, vehicle);
    }
}

function calculateFare() {
    const entry = document.getElementById("entry-time").value;
    const exit = document.getElementById("exit-time").value;
    const vehicleType = document.getElementById("vehicle-type").value;

    if (!entry || !exit || !vehicleType || selectedSlots.length === 0) return;

    const start = new Date(`1970-01-01T${entry}:00`);
    const end = new Date(`1970-01-01T${exit}:00`);
    let hours = (end - start) / (1000 * 60 * 60);
    if (hours < 0) hours += 24; // overnight

    const effectiveHours = hours > 24 ? 20 : Math.ceil(hours);
    const totalFare = fareRates[vehicleType] * effectiveHours * selectedSlots.length;

    document.getElementById("fare-display").style.display = "block";
    document.getElementById("duration-hours").textContent = effectiveHours;
    document.getElementById("calculated-fare").textContent = totalFare;
}

// Form submission with date validation
document.getElementById("parking-form").addEventListener("submit", function (event) {
    event.preventDefault();

    if (selectedSlots.length === 0) {
        alert("Please select at least one parking slot.");
        return;
    }

    const selectedDate = document.getElementById("date").value;
    const today = new Date();
    const chosenDate = new Date(selectedDate);
    today.setHours(0, 0, 0, 0);

    if (chosenDate < today) {
        alert("Please select a valid future date.");
        return;
    }

    const location = document.getElementById("parking-location").value;
    const vehicleType = document.getElementById("vehicle-type").value;
    const date = document.getElementById("date").value;
    const entryTime = document.getElementById("entry-time").value;
    const exitTime = document.getElementById("exit-time").value;

    const duration = parseInt(document.getElementById("duration-hours").textContent);
    const totalFare = parseInt(document.getElementById("calculated-fare").textContent);

    const bookingInfo = {
        location,
        vehicleType,
        date,
        entryTime,
        exitTime,
        selectedSlots,
        duration,
        totalFare
    };

    localStorage.setItem("bookingInfo", JSON.stringify(bookingInfo));

    document.getElementById("booking-success").style.display = "block";

    setTimeout(() => {
        window.location.href = "receipt.html";
    }, 2000);
});