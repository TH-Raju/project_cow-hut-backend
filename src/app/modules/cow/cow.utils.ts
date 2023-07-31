import { Cow } from "./cow.model";

export const cowSearchableFields = ['name', 'price', 'breed', 'weight', 'location'];


export const findLastCowId = async () => {
    const lastCow = await Cow.findOne({}, { id: 1, _id: 0 }).sort({
        createdAt: -1
    }).lean()

    return lastCow?.id
}
export const cowFilterableFields = [
    'searchTerm',
    'name',
    'price',
    'breed',
    'location',
    'weight',
];
export const generateCowId = async () => {

    const currentId = (await findLastCowId()) || (0).toString().padStart(5, '0')
    const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
    return incrementedId
}
