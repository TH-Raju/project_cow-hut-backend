import { Model, Schema, model } from 'mongoose';
import { IUser, UserModel, UserRole } from './user.interface';


const userSchema = new Schema<IUser>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    income: {
        type: Number,
        required: true
    },
    cow: {
        type: Schema.Types.ObjectId,
        ref: 'Cow'
    }
}, {
    //for createdAt and updatedAt
    timestamps: true,
    toJSON: {
        virtuals: true,
    }
});

export const User = model<IUser, UserModel>('User', userSchema);
