const messageContainer = document.querySelector('#messageContainer');
const ulEL = document.createElement('ul');

function displayMessage(message){
    messageContainer.classList.remove('displayHide');
    // const messageDiv = document.createElement('div');
    // messageDiv.id = 'messageDivStyle';
    
    // createAndAppendElement('p',message.text,messageDiv);
    // messageContainer.append(messageDiv);

    // createAndAppendElement('p',message.text,messageContainer);
    createAndAppendElement('li',message.text, ulEL);
    messageContainer.append(ulEL);
}

function createAndAppendElement(type,content,container){
    const element = document.createElement(type);
    element.innerText = content;
    container.append(element);
}

export{
    displayMessage
}