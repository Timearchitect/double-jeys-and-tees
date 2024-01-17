const messageContainer = document.querySelector('#messageContainer');
const ulEL = document.createElement('ul');
messageContainer.append(ulEL);

function displayMessage(message){
    messageContainer.classList.remove('displayHide');

    const textEl = document.createElement('li');
    ulEL.append(textEl);
    textEl.innerText = message.text;

  
    // createAndAppendElement('p',message.text,messageContainer);
    // createAndAppendElement('li',message.text, ulEL);
    // messageContainer.append(ulEL);

}

function getText(textEl){
    console.log(textEl);

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