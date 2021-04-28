"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const users_routes_1 = require("./users/users.routes");
const server = new server_1.Server();
server.bootstrap([users_routes_1.usersRouter]).then(server => {
    console.log('Server is listening on:', server.application.address());
}).catch(error => {
    console.log("server failed to start");
    console.error(error);
    process.exit(1); //1 indica uma saida anormal
});
