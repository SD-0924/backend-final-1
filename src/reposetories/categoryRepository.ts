import Category from "../models/Category";
import Product from "../models/Product";

export const findAndCountAllCategories = async (
  limit: number,
  offset: number
) => {
  return await Category.findAndCountAll({
    limit,
    offset,
  });
};

export const findCategoryById = async (id: string) => {
  return await Category.findByPk(id);
};

export const createCategory = async (categoryData: any) => {
  return await Category.create(categoryData);
};

export const updateCategoryById = async (id: string, updatedData: any) => {
  const category = await Category.update(updatedData,  {where: { id }});
  if (!category) {
    throw new Error("Category not found");
  }
  return category;
};

export const deleteCategoryById = async (id: string) => {
  const category =await Category.destroy({ where: { id } })
  if (!category) {
    throw new Error("Category not found");
  }
  return category;
};

export const findProductsByCategoryId = async (categoryId: string) => {
  return await Product.findAll({
    where: { categoryId },
  });
};
