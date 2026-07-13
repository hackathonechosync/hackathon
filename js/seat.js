/* ==========================================
   Anti-Kuddus Protocol v2.0
   Seat Planner Controller
========================================== */


/* ==========================
   Login Protection
========================== */

requireLogin();



/* ==========================
   User Role
========================== */


const user = getUser();



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
   Seat Database
========================== */


let seats =

Storage.get(

    "seats"

)

||

[];






const grid =

document.getElementById(

    "seatGrid"

);






/* ==========================
   Create Seats
========================== */


function createSeats(){


    grid.innerHTML="";



    for(

        let i=1;

        i<=30;

        i++

    ){



        let student =

        seats.find(

            s =>

            s.number === i

        );





        const seat =

        document.createElement(

            "div"

        );



        seat.className="card";





        seat.innerHTML = `


        <h3>

        Seat ${i}

        </h3>


        <p>

        ${

        student

        ?

        student.name

        :

        "Empty"

        }

        </p>



        ${
        
        student

        ?

        `<button class="btn remove"

        data-id="${i}">

        Remove

        </button>`

        :

        ""

        }



        `;



        grid.appendChild(seat);


    }



    addRemoveEvents();


}







/* ==========================
   Add Student
========================== */


document

.getElementById(

"addSeat"

)

.addEventListener(

"click",

()=>{


    const name =

    document

    .getElementById(

    "studentName"

    )

    .value.trim();




    if(name===""){


        toast(

        "Enter Student Name",

        "error"

        );


        return;


    }





    const emptySeat =

    Array.from(

        {length:30},

        (_,i)=>i+1

    )

    .find(

        n =>

        !seats.some(

        s=>s.number===n

        )

    );






    if(!emptySeat){


        toast(

        "No Seat Available",

        "error"

        );


        return;


    }





    seats.push({


        number:

        emptySeat,


        name:name



    });






    Storage.set(

        "seats",

        seats

    );






    document

    .getElementById(

    "studentName"

    )

    .value="";



    toast(

    "Student Added"

    );



    createSeats();



});








/* ==========================
   Remove Seat
========================== */


function addRemoveEvents(){


    const buttons =

    document.querySelectorAll(

        ".remove"

    );



    buttons.forEach(btn=>{


        btn.addEventListener(

        "click",

        ()=>{


            const id =

            Number(

            btn.dataset.id

            );



            seats =

            seats.filter(

            s=>s.number!==id

            );



            Storage.set(

            "seats",

            seats

            );



            toast(

            "Seat Removed"

            );



            createSeats();



        });


    });



}






createSeats();