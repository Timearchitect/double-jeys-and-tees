/************************************************************************** */
/* Contribution: Post messages to different lists - by Kristoffer Bengtsson */

import {
    createList,
    getAvailableLists,
    postMessageToList,
    getMessagesFromList,
    deleteMessageFromList,
    getListNameExists,
    deleteList,
    getListIdExists,
} from "./modules/lists.js";



// stoffe: Build and insert the list picker in the new message form.
buildMessageListMenu(document.querySelector("#messageForm"), "message-list-picker");

// stoffe: Build and insert the list picker in the Delete List form. 
buildMessageListMenu(document.querySelector("#deleteListsForm"), "lists-delete-id");

// stoffe: Build and insert the List to Display picker on the lists page.
buildMessageListSelector(document.querySelector("#shoppingListHeading"), 'message-list-show', messageListSelectedCallback);



// stoffe: REPLACED form event handler, create a new message with target list
const newMessageForm = document.querySelector("form");
if ((newMessageForm !== undefined) && (newMessageForm !== null)) {
    newMessageForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const userInputElem = document.querySelector("#messageForm input");
        const userInput = userInputElem.value.trim();
        const targetList = document.querySelector("#message-list-picker").value;
        const displayList = document.querySelector("#message-list-show");

        displayList.value = targetList;

        postMessageToList(targetList, userInput).then((postResponse) => {
            getMessagesFromList(targetList).then((messageData) => {
                displayMessagesInList(messageData, targetList);
            });
        });

        userInputElem.value = '';
        userInputElem.focus();
    });
}


// stoffe: Event handler, create a new list
const newListForm = document.querySelector("#listsForm");
if ((newListForm !== undefined) && (newListForm !== null)) {
    newListForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const listNameInput = newListForm.querySelector("#lists-create-name");
        const newListName = listNameInput.value.trim();

        if (newListName.length > 2) {
            if (!getListNameExists(newListName)) {
                createList(newListName).then(() => {
                    updateListsMenus();
                    alert(`New list '${newListName}' created!`);
                });
            }
            else {
                alert(`A list called '${newListName}' already exists.`);
            }
        }
        else {
            alert("You must give the new list a name at least 3 characters long.");
        }

    });
}


// stoffe: Event handler for the Delete list form
const removeListForm = document.querySelector("#deleteListsForm");
if ((removeListForm !== undefined) && (removeListForm !== null)) {
    removeListForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const listIdSelect = document.querySelector("#lists-delete-id");
        console.log("LISTPICKER", listIdSelect);

        if (getListIdExists(listIdSelect.value)) {
            if (confirm("Are you sure you want to remove this list? All associated messages are deleted as well.")) {
                console.log("deleting list ", listIdSelect.value);
                deleteList(listIdSelect.value).then(() => {
                    updateListsMenus();
                });
            }
        }
    });
}


// stoffe: Show all messages in the specified object in the message container
function displayMessagesInList(messageData, targetList) {
    const messageContainer = document.querySelector('#messageContainer');
    const messagesList = document.createElement('ul');

    messageContainer.innerHTML = '';
    messagesList.id = 'unOrdermessage';
    messageContainer.append(messagesList);

    for (const messageId in messageData) {
        const messageOption = document.createElement('li');
        const deleteBtn = document.createElement('button');
        messageOption.id = messageId;
        messageOption.innerText = messageData[messageId].text;
        deleteBtn.classList.add('deleteButton');
        messageOption.appendChild(deleteBtn);
        messagesList.appendChild(messageOption);

        deleteBtn.addEventListener("click", (event) => {
            deleteMessageFromList(targetList, messageId).then(() => {
                messageOption.remove();
            });
        });
    }
}


// stoffe: Event handler callback for selecting a list to show in the menu
function messageListSelectedCallback(event) {
    const listId = event.currentTarget.value;
    const messageListSelector = document.querySelector("#message-list-picker");

    if ((listId != 0) && (listId.length > 0)) {
        messageListSelector.value = listId;

        getMessagesFromList(listId).then((messageList) => {
            displayMessagesInList(messageList, listId);
        });
    }
}


// stoffe: Build the select menu for picking which list to show/delete
function buildMessageListSelector(containerElem, elementId, listSelectedCallback) {
    if ((containerElem === undefined) || (containerElem === null)) {
        return;
    }

    getAvailableLists().then((listData) => {
        const listElement = document.createElement("select");
        listElement.id = elementId;

        const listNullOption = document.createElement("option");
        listNullOption.value = 0;
        listNullOption.innerText = " -- Select a list to show --";
        listElement.appendChild(listNullOption);

        for (const listId in listData) {
            const listOption = document.createElement("option");
            listOption.value = listId;
            listOption.innerText = listData[listId];
            listElement.appendChild(listOption);
        }

        containerElem.innerHTML = '';
        containerElem.append(listElement);

        if (typeof listSelectedCallback == "function") {
            listElement.addEventListener("change", listSelectedCallback);
        }
    });
}


// stoffe: Build a HTML select menu for choosing a list to post messages to, and insert it into the new message form.
function buildMessageListMenu(containerElem, elementId) {
    if ((containerElem === undefined) || (containerElem === null)) {
        return;
    }

    getAvailableLists().then((listData) => {
        const listElement = document.createElement("select");
        listElement.id = elementId;

        for (const listId in listData) {
            const listOption = document.createElement("option");
            listOption.value = listId;
            listOption.innerText = listData[listId];
            listElement.appendChild(listOption);
        }
        containerElem.prepend(listElement);
    });
}

// stoffe: Refresh the list select menus
function updateListsMenus() {
    const currentPicker = document.querySelector("#message-list-picker");
    const currentViewer = document.querySelector("#message-list-show");
    const deletePicker = document.querySelector("#lists-delete-id");

    if ((!currentPicker !== undefined) && (currentPicker !== null)) {
        currentPicker.remove();
    }

    if ((!currentViewer !== undefined) && (currentViewer !== null)) {
        currentViewer.remove();
    }

    if ((!deletePicker !== undefined) && (deletePicker !== null)) {
        deletePicker.remove();
    }

    getAvailableLists(true);

    buildMessageListMenu(document.querySelector("#messageForm"), "message-list-picker");
    buildMessageListMenu(document.querySelector("#deleteListsForm"), "lists-delete-id");
    buildMessageListSelector(document.querySelector("#shoppingListHeading"), 'message-list-show', messageListSelectedCallback);
}
