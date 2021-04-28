"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const mongoose = require("mongoose");
const environment_1 = require("../common/environment");
const merge_patch_parser_1 = require("./merge-patch.parser");
class Server {
    initializeDb() {
        return __awaiter(this, void 0, void 0, function* () {
            mongoose.Promise = global.Promise;
            return mongoose.connect(environment_1.environment.db.url, {
                useMongoClient: true
            });
        });
    }
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: "meat-api",
                    version: "1.0.0"
                });
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser()); //transforma em objecto tudo que vem no body
                this.application.use(merge_patch_parser_1.mergePatchBodyParser);
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }
                this.application.listen(environment_1.environment.server.port, () => {
                    //console.log('api is running on http://localhost:3000');
                    resolve(this.application);
                });
                //this.application.on('error', (err)) tratamento de erro do servidor
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /*bootstrap(routers: Router[] = []): Promise<Server>{
        return this.initializeDb()
        .then(()=>
        this.initRoutes(routers)
        .then(()=> this
    ))}*/
    bootstrap(routers = []) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initializeDb();
            yield this.initRoutes(routers);
            return this;
        });
    }
}
exports.Server = Server;
