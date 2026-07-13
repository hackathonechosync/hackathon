/* ==========================================
   Anti-Kuddus Protocol v2.0
   Advanced SOS Controller
========================================== */


/* ==========================
   Login Protection
========================== */

requireLogin();




/* ==========================
   Elements
========================== */


const sosButton =

document.getElementById(

    "sosButton"

);



const statusText =

document.getElementById(

    "status"

);



const sosTable =

document.getElementById(

    "sosTable"

);






/* ==========================
   Send SOS
========================== */


sosButton.addEventListener(

"click",

()=>{


    statusText.innerHTML =

    "📍 Getting Location...";



    if(

        navigator.geolocation

    ){



        navigator.geolocation.getCurrentPosition(


        function(position){



            const latitude =

            position.coords.latitude;



            const longitude =

            position.coords.longitude;





            const location =

            latitude +

            "," +

            longitude;





            saveSOS(location);



        },



        function(){


            saveSOS(

            "Location Permission Denied"

            );


        }



        );



    }

    else{


        saveSOS(

        "GPS Not Supported"

        );


    }



});








/* ==========================
   Save SOS Data
========================== */


function saveSOS(location){



const user = getUser();



let sosList =

Storage.get(

    "sos"

)

||

[];







const mapLink =



location.includes(",")

?

"https://maps.google.com/?q="

+

location


:

"";








const sosData = {



id:

generateID(),



username:

user.username,



role:

user.role,



time:

new Date()

.toLocaleString(),



location:

location,



map:

mapLink



};






sosList.push(

sosData

);







Storage.set(

"sos",

sosList

);








statusText.innerHTML =


"🚨 SOS Alert Sent Successfully";






toast(

"SOS Alert Sent To Admin"

);







loadSOS();



}








/* ==========================
   Load SOS History
========================== */


function loadSOS(){



if(!sosTable)

return;





const data =

Storage.get(

"sos"

)

||

[];





sosTable.innerHTML="";






data.reverse()

.forEach(item=>{



sosTable.innerHTML += `



<tr>


<td>

${item.username}

</td>



<td>

${item.time}

</td>



<td>



${

item.map

?

`

<a 

href="${item.map}"

target="_blank"

class="btn">

View Map

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







loadSOS();