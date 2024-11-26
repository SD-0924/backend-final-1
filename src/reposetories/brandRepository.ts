import Brand from '../models/Brand';

export const createBrand = async(brandData: any)=>{
    return await Brand.create(brandData);
};