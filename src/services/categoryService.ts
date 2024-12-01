import * as categoryRepository from "../reposetories/categoryRepository";

export const getAllCategoriesService = async (limit: number, page: number) => {
  return await categoryRepository.findAndCountAllCategories(limit, page);
};

export const getCategoryByIdService = async (id: string) => {
  return await categoryRepository.findCategoryById(id);
};

export const createCategoryService = async (categoryData: any) => {
  return await categoryRepository.createCategory(categoryData);
};

export const updateCategoryService = async (id: string, updatedData: any) => {
  return await categoryRepository.updateCategoryById(id, updatedData);
};

export const deleteCategoryService = async (id: string) => {
  return await categoryRepository.deleteCategoryById(id);
};

export const getProductsByCategoryIdService = async (categoryId: string) => {
  return await categoryRepository.findProductsByCategoryId(categoryId);
};
