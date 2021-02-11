
import mongoose from 'mongoose';

export default class Database {
    constructor() {}
    
    static initDB() {
        return new Database();
    }

    async connectDB(key:string) {
        try {
            await mongoose.connect(
                key, 
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true
                }
            );

            console.log('Database On!');

        } catch (err)  {
            console.log(err);
            throw new Error('Error a la hora de iniciar la BD, ver logs');
        }
    }
        
}