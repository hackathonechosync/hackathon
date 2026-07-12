const loginForm = document.getElementById("loginForm");

if(loginForm){

    loginForm.addEventListener("submit", function(e){

        e.preventDefault();

        const roll = document.getElementById("roll").value;

        const password = document.getElementById("password").value;

        if(roll === "101" && password === "12345"){

            window.location.href = "dashboard.html";

        }

        else{

            document.getElementById("errorMsg").innerText =
            "Invalid Roll Number or Password";

        }

    });

}
const complaintForm = document.getElementById("complaintForm");

if (complaintForm) {

    complaintForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const category = document.getElementById("category").value;
        const description = document.getElementById("description").value;

        const complaint = {
            category: category,
            description: description,
            date: new Date().toLocaleString()
        };

        let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

        complaints.push(complaint);

        localStorage.setItem("complaints", JSON.stringify(complaints));

        document.getElementById("successMsg").innerText =
            "✅ Complaint submitted successfully.";

        complaintForm.reset();

    });

}
/* ===============================
   Dashboard Statistics
================================ */

const complaintCount = document.getElementById("complaintCount");

if (complaintCount) {

    const complaints =
        JSON.parse(localStorage.getItem("complaints")) || [];

    const total = complaints.length;

    document.getElementById("complaintCount").innerText = total;

    const warning = Math.min(total, 3);

    document.getElementById("warningCount").innerText = warning;

    document.getElementById("strikeLeft").innerText = 3 - warning;

    document.getElementById("progressText").innerText =
        warning + " / 3 Warnings";

    document.getElementById("progressBar").style.width =
        (warning / 3) * 100 + "%";

    if (warning >= 3) {

        document.getElementById("statusMessage").innerText =
            "🚨 Kuddus Has Been Impeached!";

    }

}
/* ===========================
   Recent Complaints
=========================== */

complaints.forEach(function(item,index){

complaintTable.innerHTML += `

<tr>

<td>${item.category}</td>

<td>${item.description}</td>

<td>${item.date}</td>

<td>

<button onclick="deleteComplaint(${index})">

Delete

</button>

</td>

</tr>

`;

});
function deleteComplaint(index){

let complaints =
JSON.parse(localStorage.getItem("complaints")) || [];

complaints.splice(index,1);

localStorage.setItem(
"complaints",
JSON.stringify(complaints)
);

location.reload();

}