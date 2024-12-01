import Category from "../models/Category";
import Product from "../models/Product";

export const findAndCountAllCategories = async (
  limit: number,
  page: number
) => {
  return await Category.findAndCountAll({
    limit,
    offset: page,
  });
};

export const findCategoryById = async (id: string) => {
  return await Category.findByPk(id);
};

export const createCategory = async (categoryData: any) => {
  return await Category.create(categoryData);
};

export const updateCategoryById = async (id: string, updatedData: any) => {
  const category = await Category.findByPk(id);
  if (!category) {
    throw new Error("Category not found");
  }
  return await category.update(updatedData);
};

export const deleteCategoryById = async (id: string) => {
  const category = await Category.findByPk(id);
  if (!category) {
    throw new Error("Category not found");
  }
  return await category.destroy();
};

export const findProductsByCategoryId = async (categoryId: string) => {
  return await Product.findAll({
    where: { categoryId },
  });
};
