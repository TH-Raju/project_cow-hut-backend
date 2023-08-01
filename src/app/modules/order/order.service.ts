import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrder = async (order: IOrder): Promise<IOrder | null> => {
    const createdOrder = await Order.create(order)
    return createdOrder
}

const getAllOrders = async () => {
    const result = await Order.find({})
    return result
}
const getSingleOrder = async (id: string): Promise<IOrder | null> => {
    const result = await Order.findById(id)
    return result;
};


export const OrderService = {
    createOrder,
    getAllOrders,
    getSingleOrder
}
