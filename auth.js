// document.addEventListener("DOMContentLoaded", function () {
//     const loginForm = document.getElementById("login-form");
//     const signupForm = document.getElementById("signup-form");

//     // LOGIN
//     if (loginForm) {
//         loginForm.addEventListener("submit", function (event) {
//             event.preventDefault();
//             const email = document.getElementById("email").value;
//             const password = document.getElementById("password").value;

//             const adminEmail = "admin@smartparking.com";
//             const adminPassword = "admin123";

//             if (email === adminEmail && password === adminPassword) {
//                 alert("Admin login successful!");
//                 window.location.href = "dashboard1.html";
//                 return;
//             }

//             const users = JSON.parse(localStorage.getItem("users")) || [];
//             const user = users.find(u => u.email === email && u.password === password);

//             if (user) {
//                 alert("User login successful!");
//                 localStorage.setItem("currentUser", JSON.stringify(user));
//                 window.location.href = "dashboard1.html";
//             } else {
//                 alert("Invalid email or password.");
//             }
//         });
//     }

//     // SIGNUP
//     if (signupForm) {
//         signupForm.addEventListener("submit", function (event) {
//             event.preventDefault();
//             const name = document.getElementById("name").value;
//             const email = document.getElementById("email").value;
//             const password = document.getElementById("password").value;
//             const vehicleType = document.getElementById("vehicle-type").value;
//             const vehicleNumber = document.getElementById("vehicle-number").value;
//             const modelName = document.getElementById("model-name").value;
//             const parkingPreference = document.getElementById("parking-preference").value;

//             let users = JSON.parse(localStorage.getItem("users")) || [];
//             if (users.some(u => u.email === email)) {
//                 alert("Email is already registered. Please log in.");
//                 return;
//             }

//             const newUser = {
//                 name,
//                 email,
//                 password,
//                 vehicleType,
//                 vehicleNumber,
//                 modelName,
//                 parkingPreference
//             };

//             users.push(newUser);
//             localStorage.setItem("users", JSON.stringify(users));
//             alert("Signup successful! Please log in.");
//             window.location.href = "login.html";
//         });
//     }
// });
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");

    // LOGIN
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const adminEmail = "admin@smartparking.com";
            const adminPassword = "admin123";

            if (email === adminEmail && password === adminPassword) {
                alert("Admin login successful!");
                const adminUser = {
                    name: "Admin",
                    email: adminEmail,
                    role: "admin"
                };
                localStorage.setItem("currentUser", JSON.stringify(adminUser));
                window.location.href = "dashboard.html";
                return;
            }

            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                alert("User login successful!");
                user.role = "user";  // Ensure user has role too
                localStorage.setItem("currentUser", JSON.stringify(user));
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid email or password.");
            }
        });
    }

    // SIGNUP
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const vehicleType = document.getElementById("vehicle-type").value;
            const vehicleNumber = document.getElementById("vehicle-number").value;
            const modelName = document.getElementById("model-name").value;
            const parkingPreference = document.getElementById("parking-preference").value;

            let users = JSON.parse(localStorage.getItem("users")) || [];
            if (users.some(u => u.email === email)) {
                alert("Email is already registered. Please log in.");
                return;
            }

            const newUser = {
                name,
                email,
                password,
                vehicleType,
                vehicleNumber,
                modelName,
                parkingPreference,
                role: "user"
            };

            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            alert("Signup successful! Please log in.");
            window.location.href = "login.html";
        });
    }
});

