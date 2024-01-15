import { putMessage, getMessages, deleteMessage } from "./modules/fetch.js";


const formEL = document.querySelector('form');
formEL.addEventListener('submit', (event) =>{
    event.preventDefault();
    const userInput = document.querySelector('input').value;
   
    putMessage(userInput);
    getMessages();
    formEL.reset();
})


