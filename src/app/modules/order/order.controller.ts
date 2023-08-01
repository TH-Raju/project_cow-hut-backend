import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../share/catchAsync';
import sendResponse from '../../../share/sendResponse';
import { OrderService } from './order.service';
import { IOrder } from './order.interface';
import mongoose from 'mongoose';
import { Cow } from '../cow/cow.model';
import { User } from '../user/user.model';


const createOrder: RequestHandler = async (req, res, next) => {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const order = req.body
        const result = await OrderService.createOrder(order)
        let checkCow = await Cow.find({ _id: order.cow })
        let cowPrice = checkCow[0].price
        let checkBuyer = await User.find({ _id: order.buyer })
        let userBudget = checkBuyer[0].budget


        if (userBudget === 0 && userBudget < cowPrice) {
            res.status(400).json({
                success: false,
                message: 'Increase Your Budget'
            })
        } else {
            await Cow.updateOne({ _id: order.cow }, { $set: { label: 'sold out' } }, { new: true })
            await User.updateOne({ _id: order.buyer }, { $set: { budget: userBudget - cowPrice } }, { new: true })
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Order Added Successfully',
                data: result
            })
        }
        await session.commitTransaction()
        await session.endSession()


    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        next(error)
    }
}

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
    const result = await OrderService.getAllOrders();
    sendResponse<IOrder[]>(res, {
        success: true,
        statusCode: 200,
        message: "Order retrieved Successfully",
        data: result
    });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await OrderService.getSingleOrder(id);

    sendResponse<IOrder>(res, {
        success: true,
        statusCode: 200,
        message: 'Order Find Successfully',
        data: result,
    });
});

export const OrderController = {
    createOrder,
    getAllOrders,
    getSingleOrder
};
