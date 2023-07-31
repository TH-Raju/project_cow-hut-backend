import { Request, Response } from "express";
import catchAsync from "../../../share/catchAsync";
import sendResponse from "../../../share/sendResponse";
import { AuthService } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await AuthService.loginUser(loginData);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User Logged in Successfully',
        data: result
    })
})

export const AuthController = {
    loginUser
}