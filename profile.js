// document.addEventListener("DOMContentLoaded", function () {
//     const editBtn = document.getElementById("edit-profile");
//     const saveBtn = document.getElementById("save-profile");
//     const profileFields = document.querySelectorAll(".profile-input");
//     const profileImageInput = document.getElementById("profile-image-upload");
//     const profileImage = document.getElementById("profile-image");

//     // Load stored data (temporary local storage simulation)
//     function loadProfileData() {
//         const storedData = JSON.parse(localStorage.getItem("userProfile"));
//         if (storedData) {
//             document.getElementById("full-name").value = storedData.name || "";
//             document.getElementById("email").value = storedData.email || "";
//             document.getElementById("phone").value = storedData.phone || "";
//             if (storedData.image) {
//                 profileImage.src = storedData.image;
//             }
//         }
//     }

//     // Enable editing fields
//     editBtn.addEventListener("click", function () {
//         profileFields.forEach(field => field.removeAttribute("disabled"));
//         saveBtn.style.display = "inline-block";
//         editBtn.style.display = "none";
//     });

//     // Save profile data
//     saveBtn.addEventListener("click", function () {
//         const userProfile = {
//             name: document.getElementById("full-name").value,
//             email: document.getElementById("email").value,
//             phone: document.getElementById("phone").value,
//             image: profileImage.src
//         };
        
//         // Store data in local storage (for now)
//         localStorage.setItem("userProfile", JSON.stringify(userProfile));

//         // Disable fields after saving
//         profileFields.forEach(field => field.setAttribute("disabled", "true"));
//         saveBtn.style.display = "none";
//         editBtn.style.display = "inline-block";
//     });

//     // Profile image upload preview
//     profileImageInput.addEventListener("change", function (event) {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = function (e) {
//                 profileImage.src = e.target.result;
//             };
//             reader.readAsDataURL(file);
//         }
//     });

//     // Load profile data when page loads
//     loadProfileData();
// });
document.addEventListener("DOMContentLoaded", function () {
    const profilePictureInput = document.getElementById("profilePicture");
    const previewImage = document.getElementById("previewImage");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const profileForm = document.getElementById("profileForm");

    // Load profile data from localStorage on page load
    function loadProfile() {
        const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
        if (savedProfile) {
            nameInput.value = savedProfile.name || "";
            emailInput.value = savedProfile.email || "";
            phoneInput.value = savedProfile.phone || "";
            if (savedProfile.image) {
                previewImage.src = savedProfile.image;
            }
        }
    }

    // Save profile data to localStorage when form is submitted
    profileForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const userProfile = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            image: previewImage.src
        };

        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        alert("Profile saved successfully!");
    });

    // Show preview image immediately after file is chosen
    profilePictureInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                previewImage.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Load saved profile data right away
    loadProfile();
});
