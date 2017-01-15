/**
 * contactService/index.js
 * initial file for contactService 
 * starts the contactService and allows us to perform operations for the methods
 */
const contacts = require("./data/contacts.json")

/**
 * getContact
 *
 * @param {String} id id of the given contact
 * @returns {Object, undefined} - If found object is returned otherwise undefined 
 */
function getContact (call, callback) {
    const { id } = call.request
    const contact = contacts[id]

    if (contact) {
        const contactResponse = Object.assign({}, { status: true }, { contact: Object.assign({ id }, contact) })
        callback(undefined, contactResponse)
    } else {
        callback(undefined, { status: false })
    }
}

function addContact (call, callback) {
    console.log(call.request)
}

module.exports = {
    getContact
}