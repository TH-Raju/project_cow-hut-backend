import { Request, Response } from "express";
import catchAsync from "../../../share/catchAsync";

const loginUser = catchAsync(async (req: Request, res: Response) => {
    console.log(req.body);
})

export const AuthController = {
    loginUser
}