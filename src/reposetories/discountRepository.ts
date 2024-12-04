import Discount from '../models/Discount';

export const getAllDiscounts = async () => {
    return await Discount.findAll();
};

export const getDiscountById = async (id: string) => {
    return await Discount.findByPk(id);
};

export const createDiscount = async (data: any) => {
    return await Discount.create(data);
};

export const updateDiscount = async (id: string, data: any) => {
    const discount = await Discount.findByPk(id);
    if (discount) {
        return await discount.update(data);
    }
    throw new Error('Discount not found');
};

export const deleteDiscount = async (id: string) => {
    const discount = await Discount.findByPk(id);
    if (discount) {
        return await discount.destroy();
    }
    throw new Error('Discount not found');
};

export const getDiscountTimeRemainingById = async (discountId: string) => {
    const discount = await Discount.findOne({
        where: { id: discountId },
    });

    if (!discount) {
        throw new Error('Discount not found');
    }

    const now = new Date();
    if (discount.endDate < now) {
        return { remainingTime: 0, message: 'Discount has expired' };
    }

    const remainingTime = discount.endDate.getTime() - now.getTime();
    return { remainingTime, message: 'Discount is still active' };
};

export const getDiscountByProductId = async (productId: string) => {
    try {
        const discount = await Discount.findOne({ where: { productId } });
        return discount;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching discount');
    }
};