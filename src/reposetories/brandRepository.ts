import Brand from '../models/Brand';

export const createBrand = async(brandData: any)=>{
    return await Brand.create(brandData);
};

export const findBrandByName = async(name: string)=>{
    return Brand.findOne({ where: { name } });
};

export const getBrandById = async(id: string)=>{
    try{
        // searching for the brand with id
        const brand = await Brand.findOne({
            where: { id },         // match the UUID
        });

        return brand;

    }catch(err){
        console.error('Error fetching brand by ID:', err);
        throw new Error('Failed to fetch brand by ID');
    }
};