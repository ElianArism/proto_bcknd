import { Schema, Model, model, Document} from 'mongoose';

const SizeSchema: Schema = new Schema ({
    size: {
        type: String,
        required: true
    }, 
    avaible: {
        type: Boolean,
        default: false
    }
}, {collection: 'talles'}); 

export interface ISize extends Document {
    size: string;
    avaible: boolean;
}

SizeSchema.method('toJSON', function() {
    const { __v, ...object }: any = this.toObject(); 
    return object;
});

export const SizeModel: Model<ISize> = model<ISize>('Size', SizeSchema);