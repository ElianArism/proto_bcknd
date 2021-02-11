import { Schema, Model, model, Document } from 'mongoose';

const BrandSchema: Schema = new Schema({
    name: {
        type: String, 
        required: true
    }
}); 

export interface IBrand extends Document {
    name: string; 
}

export const BrandModel: Model<IBrand> = model('Brand', BrandSchema); 