/* ==========================================
   Anti-Kuddus Protocol v2.0
   Final Admin Controller
========================================== */



requireLogin();





/* ==========================
   Admin Security
========================== */


if(!hasRole("Admin")){


toast("Access Denied");


setTimeout(()=>{


window.location.href="dashboard.html";


},1000);


}






/* ==========================
   Complaint System
========================== */


const table =

document.getElementById("adminTable");



let complaints =

Storage.get("complaints")

||

[];






function loadComplaints(){


if(!table)return;



table.innerHTML="";





if(complaints.length===0){


table.innerHTML=`

<tr>

<td colspan="7">

No Complaint Found

</td>

</tr>

`;

return;


}





complaints.forEach(item=>{



table.innerHTML += `


<tr>


<td>

${item.id}

</td>



<td>

${item.username}

</td>



<td>

${item.category}

</td>



<td>

${item.priority}

</td>



<td>


<select

onchange="changeStatus('${item.id}',this.value)">



<option ${item.status=="Pending"?"selected":""}>

Pending

</option>



<option ${item.status=="Resolved"?"selected":""}>

Resolved

</option>



<option ${item.status=="Warning"?"selected":""}>

Warning

</option>



</select>


</td>



<td>


${
item.attachment

?

`

<a href="${item.attachment}"

target="_blank"

class="btn">

View

</a>

`

:

"None"

}


</td>



<td>


<button

class="btn"

onclick="deleteComplaint('${item.id}')">


Delete


</button>


</td>


</tr>



`;



});


}







function changeStatus(id,status){


complaints = complaints.map(item=>{


if(item.id===id)

item.status=status;



return item;


});



Storage.set(

"complaints",

complaints

);



toast(

"Status Updated"

);



}







function deleteComplaint(id){


complaints =

complaints.filter(item=>

item.id!==id

);



Storage.set(

"complaints",

complaints

);



toast(

"Complaint Deleted"

);



loadComplaints();


}









/* ==========================
   PDF Export
========================== */


function exportPDF(){



const {jsPDF}=window.jspdf;


const doc=new jsPDF();



doc.text(

"Anti-Kuddus Protocol Complaint Report",

20,

20

);



let y=40;



complaints.forEach((item,index)=>{


doc.text(

`${index+1}. ${item.category} - ${item.status}`,

20,

y

);



y+=10;



});




doc.save(

"Complaint_Report.pdf"

);



toast(

"PDF Created"

);


}









/* ==========================
   SOS Dashboard
========================== */


function loadSOS(){


const table=

document.getElementById(

"sosAdminTable"

);



const total=

document.getElementById(

"totalSOS"

);



if(!table)return;



const sos=

Storage.get("sos")

||

[];




total.textContent=

sos.length;




table.innerHTML="";




sos.reverse()

.forEach(item=>{



table.innerHTML += `


<tr>


<td>

${item.username}

</td>



<td>

${item.role}

</td>



<td>

${item.time}

</td>



<td>


${
item.map

?

`

<a href="${item.map}"

target="_blank"

class="btn">

Map

</a>

`

:

item.location

}



</td>


</tr>


`;



});



}






loadComplaints();

loadSOS();