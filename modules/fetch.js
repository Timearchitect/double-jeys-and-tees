let baseUrl = `https://doublejeysandtees-default-rtdb.europe-west1.firebasedatabase.app/messages/.json`;

/* PUT */
async function putMessage(userInput) {
    let messageObject = { text:userInput, time: new Date() };

    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageObject),
    };

    let response = await fetch(baseUrl,requestOptions);
    let data = await response.json();
    console.log(data);
}

/* POST */
async function postMessage(userInput) {
    let messageObject = { text: userInput, time: new Date()};

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageObject),
    };

    let response = await fetch(baseUrl,requestOptions);
    let data = await response.json();
    console.log(data);
}

/* PATCH */
async function patchMessage() {
    let messageObject = { text: "Hello world put", time: new Date() };

    const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageObject),
    };

    let response = await fetch(baseUrl,requestOptions);
    let data = await response.json();
    // console.log(data);
}

/* GET */
async function getMessages() {
    let response = await fetch(baseUrl);
    let data = await response.json();
    console.log(data);
    return data;
}

/* DELETE */
async function deleteMessage() {
    const requestOptions = {
        method: "DELETE",
    };
    let response = await fetch(baseUrl,requestOptions);
    let data = await response.json();
    // console.log(data);
}


export{
    getMessages,
    putMessage,
    postMessage,
    patchMessage,
    deleteMessage
}
