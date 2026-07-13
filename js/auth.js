/* ==========================================
   Anti-Kuddus Protocol v2.0
   Authentication System
========================================== */


/* ==========================
   Demo Users Database
========================== */

const users = [

    {

        username:"admin",

        password:"admin123",

        role:"Admin"

    },


    {

        username:"teacher",

        password:"teacher123",

        role:"Teacher"

    },


    {

        username:"student",

        password:"student123",

        role:"Student"

    }

];



/* ==========================
   Login Function
========================== */

function loginUser(

    username,

    password

){


    const user = users.find(

        u =>

        u.username === username &&

        u.password === password

    );



    if(user){


        localStorage.setItem(

            "loggedIn",

            "true"

        );


        localStorage.setItem(

            "username",

            user.username

        );


        localStorage.setItem(

            "role",

            user.role

        );



        return true;


    }



    return false;


}



/* ==========================
   Login Form Handler
========================== */


function setupLogin(){


    const form =

    document.getElementById(

        "loginForm"

    );


    if(!form) return;



    form.addEventListener(

        "submit",

        function(e){


            e.preventDefault();



            const username =

            document

            .getElementById(

                "username"

            )

            .value.trim();




            const password =

            document

            .getElementById(

                "password"

            )

            .value.trim();





            if(

                loginUser(

                    username,

                    password

                )

            ){


                toast(

                    "Login Successful"

                );



                setTimeout(()=>{


                    window.location.href=

                    "dashboard.html";



                },1000);



            }


            else{


                toast(

                    "Invalid Login Details",

                    "error"

                );


            }


        }

    );


}



/* ==========================
   Role Check
========================== */


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
   Role Protection
========================== */


function requireRole(role){


    if(

        !hasRole(role)

    ){


        toast(

            "Access Denied",

            "error"

        );


        setTimeout(()=>{


            window.location.href=

            "dashboard.html";



        },1000);


    }


}


/* ==========================
   Auto Start
========================== */


document.addEventListener(

"DOMContentLoaded",

()=>{


    setupLogin();


}

);