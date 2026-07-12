// ======================================
// Seat Planner
// Part 1 - Add Student & Local Storage
// ======================================

// Get Form Elements
const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const classroom = document.getElementById("classroom");

// Load Students
let students = JSON.parse(localStorage.getItem("students")) || [];

// ===============================
// Save Students
// ===============================

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}

// ===============================
// Add Student
// ===============================

studentForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document
        .getElementById("studentName")
        .value
        .trim();

    const height = Number(
        document.getElementById("studentHeight").value
    );

    if (name === "" || height <= 0) {

        alert("Please enter valid student information.");

        return;

    }

    students.push({

        id: Date.now(),

        name: name,

        height: height

    });

    // ছোট Height আগে
    students.sort(function (a, b) {

        return a.height - b.height;

    });

    saveStudents();

    renderStudents();

    studentForm.reset();

});

// ===============================
// Render Students
// ===============================

function renderStudents() {

    studentTable.innerHTML = "";

    classroom.innerHTML = "";

    students.forEach(function (student, index) {

        // Table

        studentTable.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${student.name}</td>

            <td>${student.height} cm</td>

            <td>

                <button class="edit-btn">

                    Edit

                </button>

            </td>

            <td>

                <button class="delete-btn">

                    Delete

                </button>

            </td>

        </tr>

        `;

        // Classroom

        classroom.innerHTML += `

        <div class="seat">

            <strong>Seat ${index + 1}</strong>

            <br><br>

            ${student.name}

            <br>

            ${student.height} cm

        </div>

        `;

    });

}

// First Load
renderStudents();
// ======================================
// Search Student
// ======================================

const searchStudent = document.getElementById("searchStudent");

searchStudent.addEventListener("input", function () {

    const value = this.value.toLowerCase();

    const filtered = students.filter(student =>

        student.name.toLowerCase().includes(value)

    );

    renderFilteredStudents(filtered);

});

// ======================================
// Render Filtered Students
// ======================================

function renderFilteredStudents(list) {

    studentTable.innerHTML = "";
    classroom.innerHTML = "";

    if (list.length === 0) {

        studentTable.innerHTML = `
        <tr>
            <td colspan="5">No Student Found</td>
        </tr>`;

        return;
    }

    list.forEach((student, index) => {

        studentTable.innerHTML += `
        <tr>

            <td>${index + 1}</td>

            <td>${student.name}</td>

            <td>${student.height} cm</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editStudent(${student.id})">

                    Edit

                </button>

            </td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})">

                    Delete

                </button>

            </td>

        </tr>
        `;

        classroom.innerHTML += `

        <div class="seat">

            <strong>Seat ${index + 1}</strong>

            <br><br>

            ${student.name}

            <br>

            ${student.height} cm

        </div>

        `;

    });

}
// ======================================
// Delete Student
// ======================================

function deleteStudent(id){

    if(!confirm("Delete this student?")) return;

    students = students.filter(student => student.id !== id);

    saveStudents();

    renderStudents();

}
// ======================================
// Edit Student
// ======================================

function editStudent(id){

    const student = students.find(s => s.id === id);

    if(!student) return;

    const newName = prompt(
        "Student Name",
        student.name
    );

    if(newName === null) return;

    const newHeight = prompt(
        "Student Height",
        student.height
    );

    if(newHeight === null) return;

    student.name = newName.trim();
    student.height = Number(newHeight);

    students.sort((a,b)=>a.height-b.height);

    saveStudents();

    renderStudents();

}
