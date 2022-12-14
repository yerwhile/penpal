import { sendRequest, getRecipients, getAuthors } from "./dataAccess.js";

const formState = {
    authorId: 0,
    authorName: "",
    authorEmail: "",
    recipientId: 0,
    recipientName: "",
    recipientEmail: ""
}

export const LetterForm = () => {
    const authors = getAuthors();
    const recipients = getRecipients();

    let html = `
    <div class="field">
        <label class="label" for="letterAuthor">Author</label>
        <select name="letterAuthor" id="authors">
            <option value="">Choose Author</option>
            ${authors.map(
                author => {
                    return `<option value="${author.id}--${author.name}--${author.email}" id="author__option">${author.name}</option>`
                }
            ).join("")}
        </select>
    </div>
    <div class ="field">
        <label class="label" for="letterBody">Letter</label>
        <input type="text" name="letterBody" />
    </div>
    <div class="field" id="topics_field">
            <label class="label" for="topics">Topics</label>
        <div id="topics_options">
                <input type="radio" id="topic1" name="topics" value="Business">
                <label for="topic1"> Business</label>
                <input type="radio" id="topic2" name="topics" value="Friendly">
                <label for="topic2"> Friendly</label>
                <input type="radio" id="topic3" name="topics" value="Family">
                <label for="topic3"> Family</label>
                <input type="radio" id="topic4" name="topics" value="Congratulations">
                <label for="topic4"> Congratulations</label>
                <input type="radio" id="topic5" name="topics" value="Condolences">
                <label for="topic5"> Condolences</label>
        </div>
    </div>
    <div class="field">
        <label class="label" for="letterRecipient">Recipient</label>
        <select name="letterRecipient" id="recipients">
            <option value="">Choose Recipient</option>
            ${recipients.map(
                recipient => {
                    return `<option value="${recipient.id}--${recipient.name}--${recipient.email}" id="recipient__option">${recipient.name}</option>`
                }
            ).join("")}
        </select>

    <button class="button" id="submitRequest">Submit Request</button>`
    return html;
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        const letterAuthor = formState.authorName
        const letterAuthorEmail = formState.authorEmail
        const letterBody = document.querySelector("input[name='letterBody']").value
        const letterTopic = document.querySelector("input[name='topics']").value
        const letterRecipient = formState.recipientName
        const letterRecipientEmail = formState.recipientEmail

        // Make an object out of the user input
        const dataToSendToAPI = {
            author: letterAuthor,
            letter: letterBody,
            authorEmail: letterAuthorEmail,
            topic: letterTopic,
            recipient: letterRecipient,
            recipientEmail: letterRecipientEmail,
            date: Date()
        }

        // Send the data to the API for permanent storage
        sendRequest(dataToSendToAPI);
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "authors") {
            const [authorId, authorName, authorEmail] = event.target.value.split("--");
            formState.authorId = authorId;
            formState.authorName = authorName;
            formState.authorEmail = authorEmail
        }
    }
)


mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "recipients") {
            const [recipientId, recipientName, recipientEmail] = event.target.value.split("--");
            formState.recipientId = recipientId;
            formState.recipientName = recipientName;
            formState.recipientEmail = recipientEmail;
        }
    }
)