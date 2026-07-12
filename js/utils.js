function getComplaints() {
    return JSON.parse(localStorage.getItem("complaints")) || [];
}

function saveComplaints(data) {
    localStorage.setItem("complaints", JSON.stringify(data));
}

function deleteComplaint(id) {

    const complaints = getComplaints();

    const updated = complaints.filter(item => item.id !== id);

    saveComplaints(updated);

}
function showToast(message){

    const toast =
    document.getElementById("toast");

    if(!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}