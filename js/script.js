/* ==========================================
   Anti-Kuddus Protocol v2.0
   Main Script
========================================== */


/* ==========================
   User Database
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
   Initialize
========================== */


document.addEventListener(

"DOMContentLoaded",

()=>{


setupLogin();


}

);








/* ==========================
   Login System
========================== */


function setupLogin(){



const form =

document.getElementById(

"loginForm"

);





if(!form)

return;







form.addEventListener(

"submit",

function(e){



e.preventDefault();






const username =

document.getElementById(

"username"

).value.trim();






const password =

document.getElementById(

"password"

).value.trim();








const user =

users.find(

u =>

u.username===username

&&

u.password===password

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

"Invalid Username or Password"

);



}



});



}