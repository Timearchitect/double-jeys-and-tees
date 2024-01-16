const messageContainer = document.querySelector('#messageContainer');
function displayMessage(message){
    messageContainer.classList.remove('displayHide');
    // const messageDiv = document.createElement('div');
    // messageDiv.id = 'messageDivStyle';
    
    // createAndAppendElement('p',message.text,messageDiv);
    // messageContainer.append(messageDiv);

    createAndAppendElement('p',message.text,messageContainer);
}

function createAndAppendElement(type,content,container){
    const element = document.createElement(type);
    element.innerText = content;
    container.append(element);
}

export{
    displayMessage
}