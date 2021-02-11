import { Model, model, Schema, Document } from 'mongoose';

const AdminSchema: Schema = new Schema ({
    email: {
        type: String, 
        required: true, 
        unique: true
    }, 
    password: {
        type: String, 
        required: true 
    },
    active: {
        type: Boolean,
        default: true
    }

}, {collection: 'administradores'});

export interface IAdminUser extends Document {
    email: string;
    password: string;
    active: boolean;
}


AdminSchema.method('toJSON', function() {
    const {__v, password, ...object}: any = this.toObject();
    return object; 
});

export const AdminModel: Model<IAdminUser> = model<IAdminUser>('Admin', AdminSchema);