import { SortOrder } from "mongoose";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IUser, IUserFilters } from "./user.interface";
import { User } from "./user.model";
import { generateUserId, userSearchableFields } from "./user.utils";
import { Admin } from "../admin/admin.model";
import { IAdmin } from "../admin/admin.interface";


const createUser = async (user: IUser): Promise<IUser | null> => {

    //auto generated incremental id
    const id = await generateUserId()
    user.id = id
    //default password
    if (!user.password) {
        user.password = config.default_pass as string
    }

    const createdUser = await User.create(user)
    if (!createdUser) {
        throw new ApiError(400, 'Failed to create user...')
    }
    return createdUser
}

const getAllUser = async (
    filters: IUserFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
    const { searchTerm, ...filtersData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            $or: userSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }

    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }

    const { page, limit, skip, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(paginationOptions);

    const sortConditions: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }

    const whereConditions =
        andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await User.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await User.countDocuments();

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
    const result = await User.findById(id)
    return result;
};


const getMyProfile = async (phoneNumber: string) => {

    if (phoneNumber === undefined) {
        const result = await Admin.findOne({ adminNumber: phoneNumber })
        return result
    } else {
        const result = await User.findOne({ phoneNumber: phoneNumber })
        return result
    }

};




const deleteUser = async (id: string): Promise<IUser | null> => {
    const result = await User.findByIdAndDelete(id)
    return result;
};

const updateProfile = async (
    phoneNumber: string,
    payload: Partial<IAdmin | IUser>
) => {
    if (phoneNumber === undefined) {
        const result = await Admin.findOneAndUpdate({ adminNumber: phoneNumber }, payload, { new: true })
        return result
    } else {
        const result = await User.findOneAndUpdate({ phoneNumber: phoneNumber }, payload, { new: true })
        return result
    }
};
const updateUser = async (
    id: string,
    payload: Partial<IUser>
): Promise<IUser | null> => {
    const result = await User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};



export const UserService = {
    createUser,
    getAllUser,
    getMyProfile,
    getSingleUser,
    deleteUser,
    updateUser,
    updateProfile
}
