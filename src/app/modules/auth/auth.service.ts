import ApiError from "../../../errors/ApiError"
import { IAdmin } from "../admin/admin.interface"
import { Admin } from "../admin/admin.model"
import { ILoginUser, ILoginUserResponse, iRefreshTokenResponse } from "./auth.interface"
import jwt, { Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import config from "../../../config"
import { jwtHelpers } from "../../../helpers/jwtHelpers"
import httpStatus from "http-status"
import { User } from "../user/user.model"

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
    const { phoneNumber, password } = payload
    const isUserExist = await User.isUserExist(phoneNumber)

    if (!isUserExist) {
        throw new ApiError(404, 'User Not exist!')
    }

    if (isUserExist.password && !User.isPasswordMatched(password, isUserExist?.password)) {
        throw new ApiError(401, 'Password does not match')
    }

    // create access token & refresh token

    const { phoneNumber: userNumber, role, needsPasswordChange } = isUserExist
    const accessToken = jwtHelpers.createToken({ userNumber, role }, config.jwt.secret as Secret, config.jwt.expires_in as string)
    const refreshToken = jwtHelpers.createToken({ userNumber, role }, config.jwt.refresh_secret as Secret, config.jwt.refresh_expires_in as string)




    return {
        accessToken,
        refreshToken,
        needsPasswordChange
    }
}


const refreshUserToken = async (token: string): Promise<iRefreshTokenResponse> => {
    //verify token

    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers.verifyToken(token, config.jwt.refresh_secret as Secret);

    } catch (err) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh token')
    }

    const { userNumber } = verifiedToken
    const isUserExist = await User.isUserExist(userNumber)
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not exist')
    }

    // generate new token
    const newAccessToken = jwtHelpers.createToken({ phoneNumber: isUserExist.phoneNumber, role: isUserExist.role }, config.jwt.secret as Secret, config.jwt.expires_in as string)


    return {
        accessToken: newAccessToken
    }
}
const loginAdmin = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
    const { phoneNumber, password } = payload
    const isUserExist = await Admin.isAdminExist(phoneNumber)

    if (!isUserExist) {
        throw new ApiError(404, 'User Not exist!')
    }

    if (isUserExist.password && !Admin.isPasswordMatched(password, isUserExist?.password)) {
        throw new ApiError(401, 'Password does not match')
    }

    // create access token & refresh token

    const { phoneNumber: adminNumber, role, needsPasswordChange } = isUserExist

    const accessToken = jwtHelpers.createToken({ adminNumber, role }, config.jwt.secret as Secret, config.jwt.expires_in as string)

    const refreshToken = jwtHelpers.createToken({ adminNumber, role }, config.jwt.refresh_secret as Secret, config.jwt.refresh_expires_in as string)

    console.log(accessToken, isUserExist);


    return {
        accessToken,
        refreshToken,
        needsPasswordChange

    }
}


const refreshToken = async (token: string): Promise<iRefreshTokenResponse> => {
    //verify token

    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers.verifyToken(token, config.jwt.refresh_secret as Secret);

    } catch (err) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh token')
    }

    const { adminNumber } = verifiedToken
    const isAdminExist = await Admin.isAdminExist(adminNumber)
    if (!isAdminExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not exist')
    }

    // generate new token
    const newAccessToken = jwtHelpers.createToken({ phoneNumber: isAdminExist.phoneNumber, role: isAdminExist.role }, config.jwt.secret as Secret, config.jwt.expires_in as string)


    return {
        accessToken: newAccessToken
    }
}


export const AuthService = {
    loginAdmin,
    loginUser,
    refreshUserToken,
    refreshToken
}