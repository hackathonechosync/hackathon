// ==============================
// Admin Dashboard
// ==============================

// Get Data
const complaints = getComplaints();

const students =
    JSON.parse(localStorage.getItem("students")) || [];

const sosHistory =
    JSON.parse(localStorage.getItem("sosHistory")) || [];

// Elements
const complaintTable =
    document.getElementById("complaintTable");

const studentTable =
    document.getElementById("studentTable");

// ==============================
// Statistics
// ==============================

document.getElementById("totalComplaints").textContent =
    complaints.length;

document.getElementById("totalStudents").textContent =
    students.length;

document.getElementById("totalSOS").textContent =
    sosHistory.length;

document.getElementById("totalWarnings").textContent =
    Math.min(complaints.length, 3);

// ==============================
// Complaint Table
// ==============================

function loadComplaints() {

    complaintTable.innerHTML = "";

    if (complaints.length === 0) {

        complaintTable.innerHTML = `
        <tr>
            <td colspan="3">
                No complaints found.
            </td>
        </tr>
        `;

        return;
    }

    complaints.forEach(item => {

        complaintTable.innerHTML += `
        <tr>

            <td>${item.category}</td>

            <td>${item.description}</td>

            <td>${item.date}</td>

        </tr>
        `;

    });

}

loadComplaints();

// ==============================
// Student Table
// ==============================

function loadStudents() {

    studentTable.innerHTML = "";

    if (students.length === 0) {

        studentTable.innerHTML = `
        <tr>
            <td colspan="3">
                No students found.
            </td>
        </tr>
        `;

        return;

    }

    students.forEach(student => {

        studentTable.innerHTML += `
        <tr>

            <td>${student.seat}</td>

            <td>${student.name}</td>

            <td>${student.height} cm</td>

        </tr>
        `;

    });

}

loadStudents();