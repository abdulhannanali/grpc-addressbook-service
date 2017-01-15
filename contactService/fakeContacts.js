/**
 * fakeContacts.js
 *
 * allows us to generate some more fake contacts
 */
const faker = require('faker')
const fs = require('fs')

const contacts = {}

for (var i = 0; i < 20; i++) {
    contacts['contact' + i] = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        address: faker.address.streetAddress(),
        email: faker.internet.email(),
        website: `http://contact${i}.com`,
        phone: {
            country_code: '+92',
            phone_number: faker.phone.phoneNumberFormat()
        },
        contact_type: Math.floor(Math.random() * 5)
    }
}

fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts, null, 4))