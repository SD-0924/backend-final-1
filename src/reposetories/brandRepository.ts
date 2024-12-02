import Brand from '../models/Brand';

export const createBrand = async(brandData: any)=>{
    return await Brand.create(brandData);
};

export const findBrandByName = async(name: string)=>{
    return Brand.findOne({ where: { name } });
};

export const updateLogoURL = async(id: string, logoUrl: string)=> {
    const brand = await Brand.findByPk(id);
    if (brand) {
        brand.logo = logoUrl;
        await brand.save();
    }
}

export const getBrandById = async(id: string)=>{
    try{
        const brand = await Brand.findOne({
            where: { id },         // match the UUID
        });

        return brand;

    }catch(error){
        console.error('Error fetching brand by ID:', error);
        throw new Error('Failed to fetch brand by ID');
    }
};

export const getAllBrandsRepo = async () => {
    try {
        return await Brand.findAll({
            attributes: ['id', 'name', 'logo'],
        });
    } catch (error) {
        console.error('Error fetching brands from the repository:', error);
        throw new Error('Database error');
    }
};

export const deleteBrandByIdRepo = async (id: string) => {
    const brand = await Brand.findByPk(id);
    if (!brand) {
        throw new Error("Brand not found");
    }
    return await brand.destroy();
};

export const updateBrandRepository = async (brandId: string, updatedData: { name?: string; logo?: string }) => {
    const brand = await Brand.findByPk(brandId);
    if (!brand) {
        throw new Error("Brand not found");
    }
    return await brand.update(updatedData);
};