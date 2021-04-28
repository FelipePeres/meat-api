import * as restify from 'restify';
import * as mongoose from 'mongoose';

import { environment } from '../common/environment';
import {Router} from '../common/router';
import { mergePatchBodyParser } from './merge-patch.parser';

export class Server{

    application : restify.Server;

    async initializeDb(): Promise<mongoose.MongooseThenable>{
        (<any>mongoose).Promise = global.Promise
        return mongoose.connect(environment.db.url, {
            useMongoClient: true
        });
    }

    initRoutes(routers: Router[]):Promise<any>{

        return new Promise((resolve, reject)=>{
            try {
                this.application = restify.createServer({
                    name:"meat-api",
                    version: "1.0.0"
                });
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());//transforma em objecto tudo que vem no body
                this.application.use(mergePatchBodyParser);

                for(let router of routers){
                    router.applyRoutes(this.application)
                }
                this.application.listen(environment.server.port, () => {
                    //console.log('api is running on http://localhost:3000');
                    resolve(this.application); 
                });
                //this.application.on('error', (err)) tratamento de erro do servidor
            } catch (error) {
                reject(error);
                
            }            
        })
    }

    /*bootstrap(routers: Router[] = []): Promise<Server>{
        return this.initializeDb()
        .then(()=> 
        this.initRoutes(routers)
        .then(()=> this
    )s)}*/

    async bootstrap(routers: Router[] = []): Promise<Server>{
        await this.initializeDb();
        await this.initRoutes(routers);
        return this;
    }
}