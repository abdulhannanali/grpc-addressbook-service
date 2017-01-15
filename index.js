const {
    PROTO_PATH
} = require('./constants')

const grpc = require('grpc')
const noop = require('lodash.noop')

const address_book_proto = grpc.load(PROTO_PATH).contacts
const ContacterService = address_book_proto.ContactService.service

// rpc methods are the methods that are going to be called, these methods are going to 
// be provided to server to be called
const contactService = require('./contactService')

/**
 * startServer
 * function to start the server and binding to the provided port 
 */
function startServer(port, host) {
    const server = new grpc.Server()
    server.addProtoService(ContacterService, contactService)


    // Server binding supports insecure credentials at this time only
    // For production environment, a more serious alterantive will be chosen
    server.bind(`${host}:${port}`, grpc.ServerCredentials.createInsecure())
    server.start()

    return server
}

const routeServer = (startServer(50051, '0.0.0.0'))

module.exports = startServer