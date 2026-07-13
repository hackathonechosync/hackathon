/* ==========================================
   Anti-Kuddus Protocol v2.0
   Analytics Controller
========================================== */



/* ==========================
   Login Protection
========================== */


requireLogin();





/* ==========================
   Hide Admin Menu
========================== */


hideAdminMenu();







/* ==========================
   Load Complaint Data
========================== */


const complaints =

Storage.get(

"complaints"

)

||

[];








/* ==========================
   Calculate Statistics
========================== */


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
   Display Data
========================== */


const totalBox =

document.getElementById(

"total"

);



const pendingBox =

document.getElementById(

"pending"

);



const resolvedBox =

document.getElementById(

"resolved"

);






if(totalBox)

totalBox.innerText = total;



if(pendingBox)

pendingBox.innerText = pending;



if(resolvedBox)

resolvedBox.innerText = resolved;









/* ==========================
   Category Analysis
========================== */


let categories = {};





complaints.forEach(item=>{



if(

categories[item.category]

){



categories[item.category]++;



}

else{



categories[item.category]=1;



}



});








const labels =

Object.keys(categories);






const values =

Object.values(categories);










/* ==========================
   Chart
========================== */


const canvas =

document.getElementById(

"complaintChart"

);






if(canvas){



new Chart(

canvas,

{


type:"doughnut",




data:{



labels:labels,



datasets:[{




label:

"Complaints",



data:values



}]



},





options:{


responsive:true,



plugins:{



legend:{



position:"bottom"



}



}



}



}



);



}