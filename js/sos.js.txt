// ===================================
// SOS Emergency Module
// ===================================

const sosBtn = document.getElementById("sosBtn");
const locationText = document.getElementById("locationText");
const mapLink = document.getElementById("mapLink");
const historyList = document.getElementById("historyList");

// =============================
// Load History
// =============================

loadHistory();

function loadHistory() {

    const history =
        JSON.parse(localStorage.getItem("sosHistory")) || [];

    historyList.innerHTML = "";

    if (history.length === 0) {

        historyList.innerHTML =
            "<li>No SOS history found.</li>";

        return;

    }

    history.forEach(item => {

        historyList.innerHTML += `
            <li>
                <strong>${item.time}</strong><br>
                📍 ${item.location}
            </li>
        `;

    });

}

// =============================
// SOS Button Click
// =============================

sosBtn.addEventListener("click", function () {

    if (!navigator.geolocation) {

        alert("Geolocation is not supported.");

        return;

    }

    navigator.geolocation.getCurrentPosition(

        function (position) {

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            locationText.textContent =
                `Latitude: ${lat}, Longitude: ${lng}`;

            mapLink.href =
                `https://www.google.com/maps?q=${lat},${lng}`;

            const history =
                JSON.parse(localStorage.getItem("sosHistory")) || [];

            history.unshift({

                time: new Date().toLocaleString(),

                location: `${lat}, ${lng}`

            });

            localStorage.setItem(
                "sosHistory",
                JSON.stringify(history)
            );

            loadHistory();

            alert("🆘 SOS Sent Successfully!");

        },

        function () {

            alert("Unable to get your location.");

        }

    );

});