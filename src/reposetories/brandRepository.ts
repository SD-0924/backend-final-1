import Brand from '../models/Brand';

export const createBrand = async(brandData: any)=>{
    return await Brand.create(brandData);
};

export const findBrandByName = async(name: string)=>{
    return Brand.findOne({ where: { name } });
};

export const updateLogoURL = async (id: string, logoUrl: string) => {
  const [updatedRows] = await Brand.update(
    { logo: logoUrl },
    { where: { id } }
  );
  if (updatedRows === 0) {
    throw new Error("Brand not found");
  }
};

export const getBrandById = async (id: string) => {
  try {
    return await Brand.findByPk(id);
  } catch (error) {
    console.error("Error fetching brand by ID:", error);
    throw new Error("Failed to fetch brand by ID");
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
  const deletedRows = await Brand.destroy({ where: { id } });
  if (deletedRows === 0) {
    throw new Error("Brand not found");
  }
};

export const updateBrandRepository = async (
  updatedData: { name?: string; logo?: string },
  brand: Brand
) => {
  return await brand.update(updatedData);
};
