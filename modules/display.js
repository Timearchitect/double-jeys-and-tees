import { deleteMessage } from "./fetch.js";

const messageContainer = document.querySelector('#messageContainer');

const ulEL = document.createElement('ul');
ulEL.id = 'unOrdermessage';
messageContainer.append(ulEL);


function displayMessage(message){
    ulEL.innerHTML = '';

    for (const popName in message) {
     
        const textListEl = document.createElement('li');
        const deleteBtn = document.createElement('button');

        textListEl.id = popName;
        ulEL.append(textListEl);
        textListEl.innerText = message[popName].text;

        console.log(deleteBtn);
        deleteBtn.classList.add('deleteButton');
        textListEl.append(deleteBtn);
    }
}

// const boldStyle = document.querySelector('#boldStyle');
// boldStyle.addEventListener('click', ()=>{
//     boldStyle.classList.toggle('boldStyle');

// })


function createAndAppendElement(type,content,container){
    const element = document.createElement(type);
    element.innerText = content;
    container.append(element);
}

export{
    displayMessage
}
