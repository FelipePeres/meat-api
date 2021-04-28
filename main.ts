import {Server} from './server/server';
import {usersRouter} from './users/users.routes';

const server = new Server();

server.bootstrap([usersRouter]).then(server=>{ //bootstrap vai fazer o applyroutes
    console.log('Server is listening on:', server.application.address());
}).catch(error=>{
    console.log("server failed to start");
    console.error(error);
    process.exit(1); //1 indica uma saida anormal
})



