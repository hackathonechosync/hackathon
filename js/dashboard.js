/* ==========================================
   Anti-Kuddus Protocol v2.0
   Dashboard Controller
========================================== */


/* ==========================
   Login Protection
========================== */


requireLogin();





/* ==========================
   User Information
========================== */


const user = getUser();





const username =

document.getElementById(

"username"

);




const role =

document.getElementById(

"role"

);





if(username){


username.innerText =

user.username;



}






if(role){


role.innerText =

user.role;



}









/* ==========================
   Hide Admin Menu
========================== */


hideAdminMenu();







/* ==========================
   Complaint Data
========================== */


const complaints =

Storage.get(

"complaints"

)

||

[];







const total =

complaints.length;





const pending =

complaints.filter(

item =>

item.status === "Pending"

).length;





const resolved =

complaints.filter(

item =>

item.status === "Resolved"

).length;







/* ==========================
   Display Complaint Stats
========================== */



document.getElementById(

"totalComplaint"

).innerText = total;





document.getElementById(

"pendingComplaint"

).innerText = pending;





document.getElementById(

"resolvedComplaint"

).innerText = resolved;









/* ==========================
   SOS Count
========================== */


const sos =

Storage.get(

"sos"

)

||

[];




const totalSOS =

document.getElementById(

"totalSOS"

);




if(totalSOS){


totalSOS.innerText =

sos.length;



}