// ===============================
// Analytics Dashboard
// ===============================

const complaints = getComplaints();

// Complaint Categories
const categories = [
    "Bribe",
    "Tiffin Theft",
    "Syllabus Bloat",
    "Washroom Tax",
    "Others"
];

// Count Complaints by Category
const counts = categories.map(category =>

    complaints.filter(item => item.category === category).length

);

// ===============================
// Pie Chart
// ===============================

new Chart(document.getElementById("pieChart"), {

    type: "pie",

    data: {

        labels: categories,

        datasets: [{

            data: counts,

            backgroundColor: [

                "#2563eb",
                "#16a34a",
                "#dc2626",
                "#f59e0b",
                "#7c3aed"

            ]

        }]

    },

    options: {

        responsive: true,

        plugins: {

            legend: {

                position: "bottom"

            }

        }

    }

});

// ===============================
// Bar Chart
// ===============================

new Chart(document.getElementById("barChart"), {

    type: "bar",

    data: {

        labels: categories,

        datasets: [{

            label: "Complaints",

            data: counts,

            backgroundColor: "#2563eb"

        }]

    },

    options: {

        responsive: true,

        scales: {

            y: {

                beginAtZero: true,

                ticks: {

                    stepSize: 1

                }

            }

        }

    }

});