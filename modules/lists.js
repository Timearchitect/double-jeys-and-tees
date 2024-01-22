/************************************************************************** */
/* Contribution: Post messages to different lists - by Kristoffer Bengtsson */


// stoffe: Added this to keep track of available lists to post messages to
let messageListsCache = {};


// stoffe: Get a list of all available message lists
async function getAvailableLists(forceRefresh = false) {
    if (!forceRefresh && ((messageListsCache !== undefined) && (messageListsCache !== null) && (Object.keys(messageListsCache).length > 0))) {
        return messageListsCache;
    }
    else {
        return await getListsData();
    }
}

// stoffe: Fetch available message list data from the database and build cache variable. 
async function getListsData() {
    let messagesUrl = `https://doublejeysandtees-default-rtdb.europe-west1.firebasedatabase.app/lists/.json`;
    let response = await fetch(messagesUrl);
    let data = await response.json();

    messageListsCache = {};

    if ((data !== undefined) && (data !== null) && (typeof data == "object") && (Object.keys(data).length > 0)) {
        for (const listId in data) {
            messageListsCache[listId] = data[listId].listname;
        }
    }

    return messageListsCache;
}

// stoffe: Check if a list with the specified name exists
function getListNameExists(listName) {
    for (const listId in messageListsCache) {
        if (messageListsCache[listId] == listName) {
            return true;
        }
    }
    return false;
}


// stoffe: Check if a list with the specified ID exists
function getListIdExists(checkListId) {
    for (const listId in messageListsCache) {
        if (listId == checkListId) {
            return true;
        }
    }
    return false;
}


// stoffe: Fetch all messages within the list with the specified ID
async function getMessagesFromList(listId) {
    let messagesUrl = `https://doublejeysandtees-default-rtdb.europe-west1.firebasedatabase.app/lists/${listId}/messages/.json`;
    let response = await fetch(messagesUrl);
    let data = await response.json();
    return data;
}


// stoffe: Skapa en ny lista med angivet namn
async function createList(listName) {
    let listUrl = `https://doublejeysandtees-default-rtdb.europe-west1.firebasedatabase.app/lists/.json`;
    let listObject = {
        listname: listName
    };

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(listObject),
    };

    let response = await fetch(listUrl, requestOptions);
    let data = await response.json();

    // Refresh the list data cache
    await getListsData();

    return data.name;

}

// stoffe: Posta ett nytt meddelande till angiven lista
async function postMessageToList(listId, messageText) {
    let messagesUrl = `https://doublejeysandtees-default-rtdb.europe-west1.firebasedatabase.app/lists/${listId}/messages/.json`;

    let messageObject = {
        text: messageText,
        time: new Date()
    };

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageObject),
    };

    let response = await fetch(messagesUrl, requestOptions);
    let data = await response.json();
    return data;
}

// stoffe: Remove the message with the specified ID from the list with the specified ID
async function deleteMessageFromList(listId, messageId) {
    let messagesUrl = `https://doublejeysandtees-default-rtdb.europe-west1.firebasedatabase.app/lists/${listId}/messages/${messageId}/.json`;

    const requestOptions = {
        method: "DELETE",
    };
    let response = await fetch(messagesUrl, requestOptions);
    let data = await response.json();
    return data;
}


// stoffe: Remove the message with the specified ID from the list with the specified ID
async function deleteList(listId) {
    let listUrl = `https://doublejeysandtees-default-rtdb.europe-west1.firebasedatabase.app/lists/${listId}/.json`;

    const requestOptions = {
        method: "DELETE",
    };
    let response = await fetch(listUrl, requestOptions);
    let data = await response.json();

    // Refresh the list data cache
    await getListsData();

    return data;
}

export {
    createList,
    deleteList,
    getListsData,
    getAvailableLists,
    postMessageToList,
    getMessagesFromList,
    deleteMessageFromList,
    getListNameExists,
    getListIdExists,
}
