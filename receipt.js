// Display booking data on receipt page from localStorage
window.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("bookingInfo"));
  if (!data) {
    document.getElementById("receipt-details").innerText = "No booking information found.";
    return;
  }

  const receiptText = `
    Location: ${data.location}
    Vehicle Type: ${data.vehicleType}
    Selected Slots: ${data.selectedSlots.join(", ")}
    Date: ${data.date}
    Entry Time: ${data.entryTime}
    Exit Time: ${data.exitTime}
    Duration: ${data.duration} hour(s)
    Total Fare: ₹${data.totalFare}
  `;

  document.getElementById("receipt-details").innerText = receiptText.trim();

  // Also populate dashboard if available
  const dashboardBookingDetails = document.getElementById("booking-details");
  if (dashboardBookingDetails) {
    dashboardBookingDetails.innerHTML = `
      <h3>Recent Booking Summary</h3>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Vehicle Type:</strong> ${data.vehicleType}</p>
      <p><strong>Slot(s):</strong> ${data.selectedSlots.join(", ")}</p>
      <p><strong>Date:</strong> ${data.date}</p>
      <p><strong>Entry Time:</strong> ${data.entryTime}</p>
      <p><strong>Exit Time:</strong> ${data.exitTime}</p>
      <p><strong>Duration:</strong> ${data.duration} hour(s)</p>
      <p><strong>Total Fare:</strong> ₹${data.totalFare}</p>
    `;
  }
});

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Header background
  doc.setFillColor(44, 62, 80);
  doc.rect(0, 0, pageWidth, 35, 'F');

  // Header text
  const shopName = "Smart Parking Systems";
  const shopAddress = "Chennai, India";
  const shopContact = "Phone: +91 9876543210 | Email: smartparkingsystem@infogmail.com";

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text(shopName, pageWidth / 2, 12, { align: "center" });

  doc.setFontSize(11);
  doc.text(shopAddress, pageWidth / 2, 18, { align: "center" });
  doc.text(shopContact, pageWidth / 2, 24, { align: "center" });

  doc.setDrawColor(200);
  doc.line(10, 36, pageWidth - 10, 36);

  // Booking content as centered block
  const data = JSON.parse(localStorage.getItem("bookingInfo"));
  if (!data) return;

  const bookingLines = [
    `Location: ${data.location}`,
    `Vehicle Type: ${data.vehicleType}`,
    `Selected Slots: ${data.selectedSlots.join(", ")}`,
    `Date: ${data.date}`,
    `Entry Time: ${data.entryTime}`,
    `Exit Time: ${data.exitTime}`,
    `Duration: ${data.duration} hour(s)`,
    `Total Fare: ₹${data.totalFare}`
  ];

  doc.setFontSize(13);
  doc.setTextColor(33);
  doc.setFont("helvetica", "normal");

  doc.text("Booking Receipt", pageWidth / 2, 46, { align: "center" });

  let currentY = 60;
  const lineSpacing = 10;
  bookingLines.forEach(line => {
    doc.text(line, pageWidth / 2, currentY, { align: "center" });
    currentY += lineSpacing;
  });

  const footerHeight = 20;
  const footerY = pageHeight - footerHeight;

  doc.setFillColor(44, 62, 80);
  doc.rect(0, footerY, pageWidth, footerHeight, 'F');

  doc.setFontSize(10);
  doc.setTextColor(255);
  doc.text("Thank you for booking with Smart Parking System!", pageWidth / 2, footerY + 7, { align: "center" });
  doc.text("Visit again", pageWidth / 2, footerY + 14, { align: "center" });

  doc.save("parking-receipt.pdf");
}

function goBack() {
  window.location.href = "dashboard.html";
}

function sendToGmail() {
  const data = JSON.parse(localStorage.getItem("bookingInfo"));
  if (!data) return alert("No booking data found.");

  const templateParams = {
    to_name: "User",
    message: `
      Booking Confirmation:
      Location: ${data.location}
      Vehicle Type: ${data.vehicleType}
      Slots: ${data.selectedSlots.join(", ")}
      Date: ${data.date}
      Entry Time: ${data.entryTime}
      Exit Time: ${data.exitTime}
      Duration: ${data.duration} hour(s)
      Total Fare: ₹${data.totalFare}
    `,
    to_email: "your-recipient-email@gmail.com"
  };

  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
    .then(function (response) {
      alert("📩 Receipt sent to your email successfully!");
    }, function (error) {
      alert("❌ Failed to send email. Please try again.");
      console.log(error);
    });
}