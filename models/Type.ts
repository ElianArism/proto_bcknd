import { Schema, Model, model, Document } from 'mongoose';

const TypeSchema: Schema =  new Schema({
    type: {
        type: String, 
        required: true
    }
}, {collection: 'tipos'}); 

export interface IType extends Document {
    type: string; 
}

export const TypeModel: Model<IType> = model('Type', TypeSchema);