import { Request, RequestHandler, Response } from "express";
import { UserService } from "./user.service";
import catchAsync from "../../../share/catchAsync";
import { userFilterableFields } from "./user.utils";
import pick from "../../../share/pick";
import { paginationFields } from "../../../helpers/paginationHelper";
import { IUser } from "./user.interface";
import sendResponse from "../../../share/sendResponse";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { IAdmin } from "../admin/admin.interface";

const createUser: RequestHandler = async (req, res, next) => {

    // console.log(req.cookies, 'cookie');
    try {
        const user = req.body
        const result = await UserService.createUser(user)
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User Created Successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getAllUser = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, userFilterableFields);

    const paginationOptions = pick(req.query, paginationFields);

    const result = await UserService.getAllUser(
        filters,
        paginationOptions
    );
    sendResponse<IUser[]>(res, {
        statusCode: 200,
        success: true,
        message: "User's Find Successfully",
        meta: result.meta,
        data: result.data,
    });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await UserService.getSingleUser(id);

    sendResponse<IUser>(res, {
        success: true,
        statusCode: 200,
        message: 'User Find Successfully',
        data: result,
    });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
    const token = req.headers.authorization
    if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    let verifiedUser = null;

    //verify token
    verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret)


    req.user = verifiedUser;
    // console.log(verifiedUser);


    const phoneNumber = verifiedUser.userNumber;
    // console.log(phoneNumber);

    const result = await UserService.getMyProfile(phoneNumber);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Profile Find Successfully',
        data: result,
    });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await UserService.deleteUser(id);

    sendResponse<IUser>(res, {
        success: true,
        statusCode: 200,
        message: 'User Deleted Successfully',
        data: result,
    });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {

    const updatedData = req.body;
    const token = req.headers.authorization
    if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    let verifiedUser = null;

    //verify token
    verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret)
    req.user = verifiedUser;
    // console.log(verifiedUser);

    const phoneNumber = verifiedUser.userNumber;
    // console.log(phoneNumber);


    const result = await UserService.updateProfile(phoneNumber, updatedData);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Profile updated Successfully',
        data: result,
    });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await UserService.updateUser(id, updatedData);

    sendResponse<IUser>(res, {
        success: true,
        statusCode: 200,
        message: 'User updated Successfully',
        data: result,
    });
});

export const UserController = {
    createUser,
    getAllUser,
    getSingleUser,
    getMyProfile,
    deleteUser,
    updateUser,
    updateProfile
};
