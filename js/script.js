// ===============================
// Login System
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const roll = document.getElementById("roll").value.trim();
        const password = document.getElementById("password").value.trim();

        if (roll === "101" && password === "12345") {

            window.location.href = "dashboard.html";

        } else {

            document.getElementById("errorMsg").innerText =
                "Invalid Roll Number or Password";

        }

    });

}