import express from 'express';

export default class Server {
    public app: express.Application;

    constructor(public port: number) {
        this.app = express();
    }

    static initInstance(port: number) {
        return new Server(port);
    }

    startServer(callback: any) {
        this.app.listen(this.port, callback) 
    }
}