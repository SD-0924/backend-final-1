import { ValidationError } from '../utils/errors';
import Rating from '../models/Rating';

export const addRating = async (ratingData: { productId: string, userId: string, ratingValue: number, review?: string }) => {
    const { productId, userId, ratingValue } = ratingData;
    if (!productId || !userId || ratingValue < 0 || ratingValue > 5) {
        throw new ValidationError('Invalid rating data');
    }
    const newRating = await Rating.create(ratingData);
    return newRating;
};

export const editRating = async (ratingId: string, updatedData: { ratingValue?: number, review?: string }) => {
    const rating = await Rating.findByPk(ratingId);
    if (!rating) {
        throw new ValidationError('Rating not found');
    }
    await rating.update(updatedData);
    return rating;
};

export const deleteRating = async (ratingId: string) => {
    const rating = await Rating.findByPk(ratingId);
    if (!rating) {
        throw new ValidationError('Rating not found');
    }
    await rating.destroy();
};

export const getRatingsByUserId = async (userId: string) => {
    const ratings = await Rating.findAll({ where: { userId } });
    return ratings;
};

export const getRatingsByProductId = async (productId: string) => {
    const ratings = await Rating.findAll({ where: { productId } });
    return ratings;
};

export const calculateRating = async (productId: string) => {
  const ratings = await Rating.findAll({ where: { productId } });
  const total = ratings.reduce(
    (acc, rating) => acc + Number(rating.ratingValue),
    0
  );  const average = ratings.length > 0 ? total / ratings.length : 0;
  return average
};

export const countRatingsForProduct = async (productId: string) => {
    const count = await Rating.count({ where: { productId } });
    return count;
};
