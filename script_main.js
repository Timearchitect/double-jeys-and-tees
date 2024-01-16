import { putMessage, getMessages, deleteMessage } from "./modules/fetch.js";
import { displayMessage } from "./modules/display.js";

//Hamburger menu "Start"//
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', ()=>{
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
})

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', ()=>{
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
})
)
//Hamburger menu "End"//


const formEL = document.querySelector('form');
formEL.addEventListener('submit', (event) =>{
    event.preventDefault();
    const userInput = document.querySelector('input').value;
   
    putMessage(userInput)
        .then(getMessages)
        .then(displayMessage)

    formEL.reset();
})


