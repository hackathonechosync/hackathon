const complaintForm = document.getElementById("complaintForm");

if (complaintForm) {

    complaintForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const category = document.getElementById("category").value;
        const description = document.getElementById("description").value;

        const complaint = {
            id: Date.now(),
            category,
            description,
            date: new Date().toLocaleString()
        };

        const complaints = getComplaints();

        complaints.push(complaint);

        saveComplaints(complaints);

       showToast("Complaint submitted successfully!");

        complaintForm.reset();

    });

}