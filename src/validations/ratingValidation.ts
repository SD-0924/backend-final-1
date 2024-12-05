export const validateRating = (ratingData: { productId: string, userId: string, ratingValue: number }) => {
    const { productId, userId, ratingValue } = ratingData;
    if (!productId || !userId || ratingValue < 0 || ratingValue > 5) {
        throw new Error('Invalid rating data');
    }
};
