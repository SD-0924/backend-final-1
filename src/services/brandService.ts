import { Request, Response } from "express";
import fs from "fs";
import {
  createBrand,
  findBrandByName,
  updateLogoURL,
  getBrandById,
  getAllBrandsRepo,
  deleteBrandByIdRepo,
  updateBrandRepository,
} from "../reposetories/brandRepository";
import {
  uploadBrandLogoToFirebase,
  getBrandImageUrlFromFirebase,
  deleteBrandImageFromFirebase,
} from "../utils/firebaseUtils";
import logger from "../logger";

export const createBrandService = async (
  name: string,
  file: Express.Multer.File
) => {
  // cheking if there is a brand with the same name
  const existingBrand = await findBrandByName(name);

  if (existingBrand) {
    throw new Error("A brand with the same name already exists.");
  }

  // path to the temporary file
  const tempFilePath = file.path;

  try {
    // create a new brand in the database - this step to get the generated id to use when uploading image to firebase
    const newBrand = await createBrand({
      name,
      logo: "", // temporarily set logo as an empty string
    });

    const brandId = newBrand.id;
    const logoUrl = await uploadBrandLogoToFirebase(tempFilePath, brandId);
    await updateLogoURL(brandId, logoUrl); // updating the temp logo with the actual image URL

    const brandUpdatedLogo = await getBrandById(brandId);
    const brandUrl = await getBrandImageUrlFromFirebase(brandUpdatedLogo!.logo);
    return {
      id: brandUpdatedLogo!.id,
      name: brandUpdatedLogo!.name,
      logo: brandUrl,
    };

    fs.unlinkSync(tempFilePath); // deleting the temporary file after upload

    return brandUpdatedLogo;
  } catch (error) {
    // cleaning up the image file in case of an error
    fs.unlinkSync(tempFilePath);
    throw error;
  }
};

export const fetchBrandByIdService = async (id: string) => {
  try {
    const brand = await getBrandById(id);
    if (!brand) {
      return null;
    }

    const logoUrl = brand.logo;
    const imageUrl = await getBrandImageUrlFromFirebase(logoUrl);

    return {
      id: brand.id,
      name: brand.name,
      logo: imageUrl,
    };
  } catch (error) {
    logger.error("Error in fetching brand by ID:", error);
    throw error;
  }
};

export const getAllBrandsService = async () => {
  try {
    const brands = await getAllBrandsRepo();

    // process each brand to include signed image URL
    const brandsWithLogos = await Promise.all(
      brands.map(async (brand) => {
        try {
          // get the signed URL for the image
          const imageUrl = await getBrandImageUrlFromFirebase(brand.logo);

          return {
            id: brand.id,
            name: brand.name,
            logo: imageUrl, // using the signed URL for the logo
          };
        } catch (error) {
          console.warn(
            `Failed to fetch image for brand ID ${brand.id}:`,
            error
          );
          return {
            id: brand.id,
            name: brand.name,
            logo: null,
          };
        }
      })
    );

    return {
      count: brandsWithLogos.length, // include the total count
      brands: brandsWithLogos, // the processed brand details
    };
  } catch (error) {
    logger.error("Error in fetching all brands:", error);
    throw new Error("Service error");
  }
};

export const deleteBrandByIdService = async (id: string): Promise<void> => {
  try {
    const brand = await getBrandById(id);

    if (!brand) {
      logger.error("Brand is not found to delete");
      throw new Error("Brand not found");
    }

    const fileName = brand.logo.replace(
      `https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}/`,
      ""
    );
    await deleteBrandImageFromFirebase(fileName); // delete the image from Firebase
    await deleteBrandByIdRepo(id); // delete the brand record from the database
  } catch (error) {
    logger.error(`Error deleting brand with ID ${id}:`, error);
    throw error;
  }
};

export const updateBrandService = async (
  id: string,
  name?: string,
  file?: Express.Multer.File
) => {
  try {
    const brand = await getBrandById(id);
    if (!brand) {
      throw new Error("Brand not found");
    }
    const updatedData: { name?: string; logo?: string } = {};
    // making sure that the update name is unrepeated
    if (name && name !== brand.name) {
      const existingBrand = await findBrandByName(name);
      if (existingBrand && existingBrand.id !== id) {
        throw new Error("A brand with the same name already exists.");
      }
      updatedData.name = name;
    }
    if (file) {
      // if we want to update the image logo
      const tempFilePath = file.path;
      try {
        const newLogoUrl = await uploadBrandLogoToFirebase(tempFilePath, id);
        updatedData.logo = newLogoUrl;
      } catch (error: any) {
        throw new Error("Error handling logo file: " + error.message);
      } finally {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      }
    }
    const updatedBrand = await updateBrandRepository(id, updatedData);
    let logoUrl = await getBrandImageUrlFromFirebase(updatedBrand.logo);
    return {
      id: updatedBrand.id,
      name: updatedBrand.name,
      logo: logoUrl,
    };
  } catch (error: any) {
    logger.error("Error updating brand service:", error.message);
    throw new Error("Service Error: " + error.message);
  }
};

export const getBrandByIdService = async (id: string) => {
  return await getBrandById(id);
};
