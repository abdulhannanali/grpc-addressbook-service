const { join } = require('path')
const grpc = require('grpc')
const util = require('util')

const PROTO_PATH = join(__dirname, '../../protos/address_book.proto')
const address_book_proto = grpc.load(PROTO_PATH).contacts

function main (port, host) {
    const client = new address_book_proto.ContactService(`${host}:${port}`, grpc.credentials.createInsecure())
    console.log(util.inspect(client))

    // getContact rpc
    const call = client.getContact({id: 'contactd0'}, function (error, contactResponse) {
        if (error) {
            console.error('Error occured while retrieving contact')
            console.error(error)
        } else {
            console.log(contactResponse)
        }
    })

    grpc.waitForClientReady(client, Infinity, function () {
        console.log('Client is ready to accept connections now')
    })

    const channel = grpc.getClientChannel(client)
}


main(50051, 'localhost')