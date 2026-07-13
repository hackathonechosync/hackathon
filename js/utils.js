/* ==========================================
   Anti-Kuddus Protocol v2.0
   Utility Controller
========================================== */



/* ==========================
   Storage Manager
========================== */


const Storage = {



    set:function(key,value){


        localStorage.setItem(

            key,

            JSON.stringify(value)

        );


    },





    get:function(key){


        const data =

        localStorage.getItem(key);



        return data

        ?

        JSON.parse(data)

        :

        null;


    },





    remove:function(key){


        localStorage.removeItem(key);


    }


};









/* ==========================
   Authentication
========================== */



function getUser(){



    return {


        username:

        localStorage.getItem(

            "username"

        ),



        role:

        localStorage.getItem(

            "role"

        )



    };


}








function isLoggedIn(){


    return (

    localStorage.getItem(

    "loggedIn"

    )

    ===

    "true"

    );


}








function requireLogin(){



    if(!isLoggedIn()){


        window.location.href=

        "index.html";


    }


}








function hasRole(role){



    return (

    localStorage.getItem(

    "role"

    )

    ===

    role


    );


}








/* ==========================
   Logout
========================== */


function logoutUser(){



    localStorage.removeItem(

        "loggedIn"

    );


    localStorage.removeItem(

        "username"

    );



    localStorage.removeItem(

        "role"

    );




    toast(

        "Logged Out"

    );



    setTimeout(()=>{


        window.location.href=

        "index.html";



    },1000);



}








/* ==========================
   Toast Notification
========================== */


function toast(message){



    const box =

    document.getElementById(

        "toast"

    );




    if(!box){



        alert(message);



        return;


    }





    box.innerHTML=

    message;



    box.classList.add(

        "show"

    );





    setTimeout(()=>{


        box.classList.remove(

            "show"

        );


    },3000);



}








/* ==========================
   Generate ID
========================== */


function generateID(){



    return "AKP-"

    +

    Date.now();



}








/* ==========================
   Date
========================== */


function currentDate(){



    return new Date()

    .toLocaleString();



}








/* ==========================
   Page Role Control
========================== */


function hideAdminMenu(){



const menu =

document.getElementById(

"adminMenu"

);




if(

menu &&

!hasRole("Admin")

){



menu.style.display="none";



}



}