import { getRequests } from "./dataAccess.js"



export const Requests = () => {
    const requests = getRequests()
    const requestToList = (requestObj) => {
        return `
        <div class="letter__results">
            <p>Dear ${requestObj.author} ${requestObj.authorEmail}</p>
            <p>${requestObj.letter}</p>
            <p>Sincerely, ${requestObj.recipient} ${requestObj.recipientEmail}</p>
            <p>Sent on ${requestObj.date}</p>
            <p class="topic_badge">Topic: ${requestObj.topic}</p>
        </div>
    `
    }
    let html = `
        <ul>
            ${
                requests.map(requestToList).join("")
            }
        </ul>
    `

    return html
}