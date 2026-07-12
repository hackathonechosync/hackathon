// ===============================
// Complaint System
// ===============================

const complaintForm = document.getElementById("complaintForm");

if (complaintForm) {

    complaintForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const category = document.getElementById("category").value;
        const description = document.getElementById("description").value.trim();

        // Validation
        if (category === "" || description === "") {

            alert("Please fill in all fields.");
            return;

        }

        // Complaint Object
        const complaint = {

            id: Date.now(),

            category: category,

            description: description,

            date: new Date().toLocaleString()

        };

        // Load Old Data
        const complaints = getComplaints();

        // Add New Complaint
        complaints.push(complaint);

        // Save
        saveComplaints(complaints);

        // Toast Notification
        if (typeof showToast === "function") {

            showToast("✅ Complaint submitted successfully!");

        } else {

            alert("Complaint submitted successfully!");

        }

        // Reset Form
        complaintForm.reset();

    });

}