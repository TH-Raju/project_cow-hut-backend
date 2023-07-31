import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../share/catchAsync';
import pick from '../../../share/pick';
import sendResponse from '../../../share/sendResponse';
import { cowFilterableFields } from './cow.utils';
import { paginationFields } from '../../../helpers/paginationHelper';
import { CowService } from './cow.service';
import { ICow } from './cow.interface';


const createCow: RequestHandler = async (req, res, next) => {
    try {
        const cow = req.body
        const result = await CowService.createCow(cow)
        res.status(200).json({
            success: true,
            message: 'Cow Added Successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}


const getAllCows = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, cowFilterableFields);

    const paginationOptions = pick(req.query, paginationFields);

    const result = await CowService.getAllCows(
        filters,
        paginationOptions
    );
    sendResponse<ICow[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Cow's find Successfully",
        meta: result.meta,
        data: result.data,
    });
});

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await CowService.getSingleCow(id);

    sendResponse<ICow>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: ' Cow retrieved Successfully',
        data: result,
    });
});

const updatedCow = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await CowService.updatedCow(id, updatedData);

    sendResponse<ICow>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: ' Cow retrieved Successfully',
        data: result,
    });
});
const deleteCow = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await CowService.deleteCow(id);

    sendResponse<ICow>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: ' Cow Deleted Successfully',
        data: result,
    });
});

export const CowController = {
    createCow,
    getAllCows,
    getSingleCow,
    updatedCow,
    deleteCow,
};
