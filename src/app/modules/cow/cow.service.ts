import { SortOrder } from "mongoose";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { ICow, ICowFilters } from "./cow.interface";
import { Cow } from "./cow.model";
import { cowSearchableFields, generateCowId } from "./cow.utils";

const createCow = async (cow: ICow): Promise<ICow | null> => {

    //auto generated incremental id
    const id = await generateCowId()
    cow.id = id


    const createdCow = await Cow.create(cow)
    if (!createdCow) {
        throw new ApiError(400, 'Failed to create cow...')
    }
    return createdCow
}

const getAllCows = async (
    filters: ICowFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
    const { searchTerm, ...filtersData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            $or: cowSearchableFields.map(field => ({
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

    const result = await Cow.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await Cow.countDocuments();

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

const getSingleCow = async (id: string): Promise<ICow | null> => {
    const result = await Cow.findById(id)
    return result;
};


const deleteCow = async (id: string): Promise<ICow | null> => {
    const result = await Cow.findByIdAndDelete(id)
    return result;
};

const updatedCow = async (
    id: string,
    payload: Partial<ICow>
): Promise<ICow | null> => {
    const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};



export const CowService = {
    createCow,
    getAllCows,
    getSingleCow,
    deleteCow,
    updatedCow
}
