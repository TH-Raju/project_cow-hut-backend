import { Model, Schema, model } from 'mongoose';
import { IUser, UserModel, UserRole } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

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
        select: false
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

userSchema.pre('save', async function (next) {

    //hashing password
    const user = this
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_round))

    next()
})

export const User = model<IUser, UserModel>('User', userSchema);
