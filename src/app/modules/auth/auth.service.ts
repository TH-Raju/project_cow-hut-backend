import ApiError from "../../../errors/ApiError"
import { IAdmin } from "../admin/admin.interface"
import { Admin } from "../admin/admin.model"
import { ILoginUser } from "./auth.interface"
import bcrypt from 'bcrypt'

const loginUser = async (payload: ILoginUser): Promise<IAdmin | null> => {

    const { phoneNumber, password } = payload

    // const admin = new Admin()


    // const isUserExist = await admin.isUserExist(phoneNumber)

    const isUserExist = await Admin.isUserExist(phoneNumber)

    if (!isUserExist) {
        throw new ApiError(404, 'Not exist!')
    }


    //match password
    // const isPasswordMatched = await bcrypt.compare(password, isUserExist.password)

    if (isUserExist.password && !Admin.isPasswordMatched(password, isUserExist?.password)) {
        throw new ApiError(401, 'Password does not match')
    }

    // create access token

    return {
    }
}


export const AuthService = {
    loginUser
}