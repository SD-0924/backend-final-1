import Rating from '../models/Rating';

export const addRating = (ratingData: { productId: string, userId: string, ratingValue: number, review?: string }) => {
    return Rating.create(ratingData);
};

export const editRating = (ratingId: string, updatedData: { ratingValue?: number, review?: string }) => {
    return Rating.update(updatedData, { where: { id: ratingId } });
};

export const deleteRating = (ratingId: string) => {
    return Rating.destroy({ where: { id: ratingId } });
};

export const getRatingsByUserId = (userId: string) => {
    return Rating.findAll({ where: { userId } });
};

export const getRatingsByProductId = (productId: string) => {
    return Rating.findAll({ where: { productId } });
};

export const calculateRating = (productId: string) => {
    return Rating.findAll({ where: { productId } });
};

export const countRatingsForProduct = (productId: string) => {
    return Rating.count({ where: { productId } });
};
