// ===============================
// Smart Seat Planner
// ===============================

// Load students from Local Storage
let students = JSON.parse(localStorage.getItem("students")) || [];

const studentForm = document.getElementById("studentForm");
const seatTable = document.getElementById("seatTable");

// Render Table
function renderTable() {

    // Height অনুযায়ী Sort (Shortest → Tallest)
    students.sort((a, b) => a.height - b.height);

    seatTable.innerHTML = "";

    if (students.length === 0) {

        seatTable.innerHTML = `
        <tr>
            <td colspan="4">No students added yet.</td>
        </tr>
        `;

        return;
    }

    students.forEach((student, index) => {

        seatTable.innerHTML += `
        <tr>
            <td>${student.name}</td>
            <td>${student.height} cm</td>
            <td>Seat ${index + 1}</td>
            <td>
                <button onclick="deleteStudent(${student.id})">
                    Delete
                </button>
                <td>
    <button class="edit-btn"
        onclick="editStudent(${student.id})">
        Edit
    </button>
</td>
            </td>
        </tr>
        `;

    });

    localStorage.setItem("students", JSON.stringify(students));

}
function renderFiltered(list){

    seatTable.innerHTML = "";

    if(list.length===0){

        seatTable.innerHTML=`
        <tr>
            <td colspan="4">
                No student found.
            </td>
        </tr>
        `;

        return;

    }

    list.forEach((student,index)=>{

        seatTable.innerHTML +=`

        <tr>

            <td>${student.name}</td>

            <td>${student.height} cm</td>

            <td>Seat ${index+1}</td>

            <td>
                <button onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
            <td>
                <button onclick="editStudent(${student.id})">
                    Edit
                </button>
            </td>

        </tr>

        `;

    });

}

// Add Student
studentForm.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("studentName").value;
    const height = Number(document.getElementById("studentHeight").value);

    students.push({
        id: Date.now(),
        name,
        height
    });

    renderTable();

    studentForm.reset();

});

// Delete Student
function deleteStudent(id){

    students = students.filter(student => student.id !== id);

    renderTable();

}

// First Load
renderTable();
const classroom = document.getElementById("classroom");

classroom.innerHTML = "";

students.forEach((student,index)=>{

    let color = "#22C55E";

    if(student.height >= 170){

        color = "#EF4444";

    }else if(student.height >= 160){

        color = "#F59E0B";

    }

    classroom.innerHTML += `

    <div class="seat"
        style="background:${color}">

        <strong>Seat ${index+1}</strong>

        <br>

        ${student.name}

        <br>

        ${student.height} cm

    </div>

    `;

});
// ===============================
// Search Student
// ===============================

const searchStudent =
document.getElementById("searchStudent");

searchStudent.addEventListener("input", function(){

    const value =
    this.value.toLowerCase();

    const filtered =
    students.filter(student =>

        student.name.toLowerCase().includes(value)

    );

    renderFiltered(filtered);

});
// ===============================
// Edit Student
// ===============================

function editStudent(id){

    const student = students.find(item => item.id === id);

    if(!student) return;

    const newName = prompt(
        "Student Name:",
        student.name
    );

    if(newName === null) return;

    const newHeight = prompt(
        "Student Height:",
        student.height
    );

    if(newHeight === null) return;

    student.name = newName.trim();
    student.height = Number(newHeight);

    renderTable();

}

