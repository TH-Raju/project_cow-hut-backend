import { Request, Response } from "express";
import catchAsync from "../../../share/catchAsync";
import sendResponse from "../../../share/sendResponse";
import { AuthService } from "./auth.service";
import config from "../../../config";
import { ILoginUserResponse } from "./auth.interface";

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

    // delete result.refreshToken

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

export const AuthController = {
    loginUser
}