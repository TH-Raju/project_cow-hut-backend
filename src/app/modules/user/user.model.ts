import { Model, Schema, model } from 'mongoose';
import { IUser, UserModel, UserRole } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const userSchema = new Schema<IUser, UserModel>({
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
    phoneNumber: {
        type: String,
        unique: true,
        required: true,
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
    },
    needsPasswordChange: {
        type: Boolean,
        default: true
    }
}, {
    //for createdAt and updatedAt
    timestamps: true,
    toJSON: {
        virtuals: true,
    }
});

userSchema.statics.isUserExist = async function (
    phoneNumber: string
): Promise<Pick<IUser, 'phoneNumber' | 'role' | 'password' | 'needsPasswordChange'> | null> {
    return await User.findOne(
        { phoneNumber },
        { phoneNumber: 1, password: 1, needsPasswordChange: 1 }
    );
}

userSchema.statics.isPasswordMatched = async function (
    givenPassword: string, savePassword: string
): Promise<boolean> {
    return await bcrypt.compare(givenPassword, savePassword)

}


userSchema.pre('save', async function (next) {

    //hashing password
    const user = this
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_round))

    next()
})

export const User = model<IUser, UserModel>('User', userSchema);
