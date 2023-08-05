import { Request, Response } from "express";
import catchAsync from "../../../share/catchAsync";
import sendResponse from "../../../share/sendResponse";
import { AuthService } from "./auth.service";
import config from "../../../config";
import { ILoginUserResponse, iRefreshTokenResponse } from "./auth.interface";

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await AuthService.loginUser(loginData);
    const { refreshToken, ...others } = result

    // set refresh token into cookie
    const cookieOptions = {
        secure: config.env === 'production',
        httpOnly: true,
    };

    res.cookie('refreshToken', result.refreshToken, cookieOptions)


    if ('refreshToken' in result) {
        delete result.refreshToken
    }

    sendResponse<ILoginUserResponse>(res, {
        statusCode: 200,
        success: true,
        message: 'User Logged in Successfully',
        data: others
    })
})

const refreshUserToken = catchAsync(async (req: Request, res: Response) => {
    const { ...refreshToken } = req.cookies;
    const result = await AuthService.refreshUserToken(refreshToken);


    // set refresh token into cookie
    const cookieOptions = {
        secure: config.env === 'production',
        httpOnly: true,
    };

    res.cookie('refreshToken', result, cookieOptions)

    // delete result.refreshToken

    if ('refreshToken' in result) {
        delete result.refreshToken
    }

    sendResponse<iRefreshTokenResponse>(res, {
        statusCode: 200,
        success: true,
        message: 'User Logged in Successfully',
        data: result
    })
})



const loginAdmin = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await AuthService.loginAdmin(loginData);
    const { refreshToken, ...others } = result

    // set refresh token into cookie
    const cookieOptions = {
        secure: config.env === 'production',
        httpOnly: true,
    };

    res.cookie('refreshToken', result.refreshToken, cookieOptions)

    if ('refreshToken' in result) {
        delete result.refreshToken
    }

    sendResponse<ILoginUserResponse>(res, {
        statusCode: 200,
        success: true,
        message: 'Admin Logged in Successfully',
        data: others
    })
})
const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { ...refreshToken } = req.cookies;
    const result = await AuthService.refreshToken(refreshToken);


    // set refresh token into cookie
    const cookieOptions = {
        secure: config.env === 'production',
        httpOnly: true,
    };

    res.cookie('refreshToken', result, cookieOptions)

    // delete result.refreshToken

    if ('refreshToken' in result) {
        delete result.refreshToken
    }

    sendResponse<iRefreshTokenResponse>(res, {
        statusCode: 200,
        success: true,
        message: 'Admin Logged in Successfully',
        data: result
    })
})

export const AuthController = {
    loginAdmin,
    loginUser,
    refreshUserToken,
    refreshToken
}