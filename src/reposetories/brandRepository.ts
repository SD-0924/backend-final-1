import Brand from '../models/Brand';

export const createBrand = async(brandData: any)=>{
    return await Brand.create(brandData);
};

export const findBrandByName = async(name: string)=>{
    return Brand.findOne({ where: { name } });
}