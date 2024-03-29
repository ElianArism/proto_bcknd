import { Schema, Model, model, Document} from 'mongoose';
import { ISize, SizeModel } from './Size';
import { IBrand } from './Brand';
import { IType } from './Type';

const ClothesSchema: Schema = new Schema({
    img: {
        type: {public_id: String, path: String}, 
        required: false,
        default: {public_id: 0, path: 'https://res.cloudinary.com/did5yztix/image/upload/v1613393186/no-img_aohaki.png'}
    },
    name: {
        type: String, 
        required: true
    }, 
    brand: { 
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'Type',
        required: true
    }, 
    gender: [{
        type: String, 
        required: true
    }],
    sizes: [{
        stock: {
            type: Number, 
            default: 0
        },
        size: {
            require: true, 
            type: Schema.Types.ObjectId,
            ref: 'Size'
        }
    }], 
    price: {
        type: Number,
        require: true 
    },
    active: {
        type: Boolean, 
        default: true
    }
}, {collection: 'prendas'});

export interface IClothes extends Document {
    _id?: string;
    img: any; 
    name: string;
    brand: IBrand; 
    type: IType;
    gender: string[];
    sizes: {stock: number, size: ISize}[];
    price: number;
    active: boolean;
}
export interface InImg {
    public_id: string; 
    path: string;
}

export const ClothesModel: Model<IClothes> = model<IClothes>('Clothes', ClothesSchema); 