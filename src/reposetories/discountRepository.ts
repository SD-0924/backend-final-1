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
