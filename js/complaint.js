/* ==========================================
   Anti-Kuddus Protocol v2.0
   Complaint Controller
   File Upload Enabled
========================================== */


/* ==========================
   Login Protection
========================== */

requireLogin();



/* ==========================
   User Data
========================== */

const user = getUser();



/* ==========================
   Hide Admin Menu
========================== */

const adminMenu =

document.getElementById(

    "adminMenu"

);



if(

    adminMenu &&

    user.role !== "Admin"

){

    adminMenu.style.display="none";

}





/* ==========================
   Complaint Form
========================== */


const form =

document.getElementById(

    "complaintForm"

);



form.addEventListener(

"submit",

function(e){


e.preventDefault();





const category =

document.getElementById(

"category"

).value;





const priority =

document.getElementById(

"priority"

).value;





const description =

document.getElementById(

"description"

).value.trim();





const fileInput =

document.getElementById(

"file"

);






if(

category === "" ||

description === ""

){


toast(

"Please fill all required fields",

"error"

);


return;


}






/* ==========================
   File Upload
========================== */


if(

fileInput.files.length > 0

){



const file =

fileInput.files[0];





if(

file.size >

2 * 1024 * 1024

){


toast(

"File size must be less than 2MB",

"error"

);


return;


}





const reader =

new FileReader();





reader.onload = function(){



saveComplaint(

reader.result,

file.name

);



};





reader.readAsDataURL(file);





}

else{


saveComplaint(

null,

null

);


}



});








/* ==========================
   Save Complaint
========================== */


function saveComplaint(

fileData,

fileName

){



const complaints =

Storage.get(

"complaints"

)

||

[];







const complaint = {



id:

generateID(),



username:

user.username,



role:

user.role,



category:

document.getElementById(

"category"

).value,



priority:

document.getElementById(

"priority"

).value,



description:

document.getElementById(

"description"

).value,



attachment:

fileData,



fileName:

fileName,



status:

"Pending",



date:

currentDate()



};







complaints.push(

complaint

);







Storage.set(

"complaints",

complaints

);







toast(

"Complaint Submitted Successfully"

);






document

.getElementById(

"complaintForm"

)

.reset();




}
