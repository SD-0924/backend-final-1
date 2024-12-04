import * as discountRepository from '../reposetories/discountRepository';

export const getAllDiscounts = async () => {
    return await discountRepository.getAllDiscounts();
};

export const getDiscountById = async (id: string) => {
    return await discountRepository.getDiscountById(id);
};

export const createDiscount = async (data: any) => {
    return await discountRepository.createDiscount(data);
};

export const updateDiscount = async (id: string, data: any) => {
    return await discountRepository.updateDiscount(id, data);
};

export const deleteDiscount = async (id: string) => {
    return await discountRepository.deleteDiscount(id);
};

export const getDiscountTimeRemainingById = async (discountId: string) => {
    return await discountRepository.getDiscountTimeRemainingById(discountId);
};


export const getDiscountByProductId = async (productId: string) => {
    return await discountRepository.getDiscountByProductId(productId);
};