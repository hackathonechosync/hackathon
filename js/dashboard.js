// ===============================
// Dashboard System
// ===============================

// Load Complaints
const complaints = getComplaints();

// Elements
const complaintTable = document.getElementById("complaintTable");
const complaintCount = document.getElementById("complaintCount");
const warningCount = document.getElementById("warningCount");
const strikeLeft = document.getElementById("strikeLeft");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const statusMessage = document.getElementById("statusMessage");

// ===============================
// Statistics
// ===============================

function updateDashboard() {

    const total = complaints.length;
    const warnings = Math.min(total, 3);

    complaintCount.textContent = total;
    warningCount.textContent = warnings;
    strikeLeft.textContent = 3 - warnings;

    progressBar.style.width = `${(warnings / 3) * 100}%`;
    progressText.textContent = `${warnings} / 3 Warnings`;

    if (warnings >= 3) {

        statusMessage.textContent =
            "🚨 Kuddus Has Been Impeached!";

    } else {

        statusMessage.textContent =
            "✅ Monitoring in Progress";

    }

}

// ===============================
// Render Complaint Table
// ===============================

function renderComplaints(list) {

    complaintTable.innerHTML = "";

    if (list.length === 0) {

        complaintTable.innerHTML = `
        <tr>
            <td colspan="5" style="text-align:center;">
                No complaints found.
            </td>
        </tr>
        `;

        return;

    }

    list.forEach(item => {

        complaintTable.innerHTML += `

        <tr>

            <td>${item.category}</td>

            <td>${item.description}</td>

            <td>${item.date}</td>

            <td>

                <button onclick="removeComplaint(${item.id})">
                    Delete
                </button>

            </td>

            <td>

                <button class="edit-btn"
                    onclick="editComplaint(${item.id})">
                    Edit
                </button>

            </td>

        </tr>

        `;

    });

}

// First Load
updateDashboard();
renderComplaints(complaints);
// ===============================
// Search Complaint
// ===============================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const value = this.value.toLowerCase();

        const filtered = complaints.filter(item =>

            item.category.toLowerCase().includes(value) ||

            item.description.toLowerCase().includes(value)

        );

        renderComplaints(filtered);

    });

}

// ===============================
// Filter Complaint
// ===============================

const filterCategory = document.getElementById("filterCategory");

if (filterCategory) {

    filterCategory.addEventListener("change", function () {

        if (this.value === "All") {

            renderComplaints(complaints);

            return;

        }

        const filtered = complaints.filter(item =>

            item.category === this.value

        );

        renderComplaints(filtered);

    });

}

// ===============================
// Delete Complaint
// ===============================

function removeComplaint(id) {

    if (!confirm("Are you sure you want to delete this complaint?")) {

        return;

    }

    deleteComplaint(id);

    location.reload();

}

// ===============================
// Edit Complaint
// ===============================

function editComplaint(id) {

    const list = getComplaints();

    const complaint = list.find(item => item.id === id);

    if (!complaint) return;

    const newDescription = prompt(
        "Edit Complaint:",
        complaint.description
    );

    if (newDescription === null) return;

    if (newDescription.trim() === "") {

        alert("Description cannot be empty.");

        return;

    }

    complaint.description = newDescription.trim();

    saveComplaints(list);

    location.reload();

}
