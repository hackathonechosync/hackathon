// ===============================
// Dashboard Version 2.0
// Part 1 - Statistics
// ===============================

// Get complaints from Local Storage
const complaints = getComplaints();

// Table Body
const complaintTable = document.getElementById("complaintTable");

// Dashboard Elements
const complaintCount = document.getElementById("complaintCount");
const warningCount = document.getElementById("warningCount");
const strikeLeft = document.getElementById("strikeLeft");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const statusMessage = document.getElementById("statusMessage");

// Statistics
const totalComplaints = complaints.length;
const warnings = Math.min(totalComplaints, 3);

// Update Dashboard
complaintCount.textContent = totalComplaints;
warningCount.textContent = warnings;
strikeLeft.textContent = 3 - warnings;

// Progress Bar
progressBar.style.width = `${(warnings / 3) * 100}%`;
progressText.textContent = `${warnings} / 3 Warnings`;

// Status Message
if (warnings >= 3) {

    statusMessage.textContent =
        "🚨 Kuddus Has Been Impeached!";

} else {

    statusMessage.textContent =
        "✅ Monitoring in Progress";

}
// ===============================
// Part 2 - Render Complaints
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

// প্রথমবার সব Complaint দেখাও
renderComplaints(complaints);

// ===============================
// Search
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
// Filter
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
// Part 3 - Delete Complaint
// ===============================

function removeComplaint(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this complaint?"
    );

    if (!confirmDelete) return;

    deleteComplaint(id);

    location.reload();

}

// ===============================
// Part 3 - Edit Complaint
// ===============================

function editComplaint(id) {

    const complaints = getComplaints();

    const complaint = complaints.find(item => item.id === id);

    if (!complaint) return;

    const newDescription = prompt(
        "Edit Complaint Description:",
        complaint.description
    );

    if (newDescription === null) return;

    if (newDescription.trim() === "") {

        alert("Description cannot be empty.");

        return;

    }

    complaint.description = newDescription.trim();

    saveComplaints(complaints);

    location.reload();

}
const complaints = getComplaints();

const complaintTable = document.getElementById("complaintTable");

// Statistics
const total = complaints.length;
const warning = Math.min(total, 3);

document.getElementById("complaintCount").textContent = total;
document.getElementById("warningCount").textContent = warning;
document.getElementById("strikeLeft").textContent = 3 - warning;

document.getElementById("progressBar").style.width = `${(warning / 3) * 100}%`;
document.getElementById("progressText").textContent = `${warning} / 3 Warnings`;

if (warning >= 3) {
    document.getElementById("statusMessage").textContent =
        "🚨 Kuddus Has Been Impeached!";
} else {
    document.getElementById("statusMessage").textContent = "";
}

// ==========================
// Render Complaints
// ==========================

function renderComplaints(list) {

    complaintTable.innerHTML = "";

    if (list.length === 0) {

        complaintTable.innerHTML = `
        <tr>
            <td colspan="4" style="text-align:center;">
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
                <td>
    <button class="edit-btn" onclick="editComplaint(${item.id})">
    Edit
</button>
</td>
            </td>

        </tr>
        `;

    });

}

// প্রথমবার Table Load
renderComplaints(complaints);

// ==========================
// Search
// ==========================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const filtered = complaints.filter(item =>
            item.category.toLowerCase().includes(value) ||
            item.description.toLowerCase().includes(value)
        );

        renderComplaints(filtered);

    });

}

// ==========================
// Filter
// ==========================

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

// ==========================
// Delete Complaint
// ==========================

function removeComplaint(id) {

    if (confirm("Are you sure you want to delete this complaint?")) {

        deleteComplaint(id);

        location.reload();

    }

}
function editComplaint(id) {

    const complaints = getComplaints();

    const complaint = complaints.find(item => item.id === id);

    const newDescription = prompt(
        "Edit Description:",
        complaint.description
    );

    if (newDescription === null) return;

    complaint.description = newDescription;

    saveComplaints(complaints);

    location.reload();

}
