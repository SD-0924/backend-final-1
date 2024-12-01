import { Request, Response } from "express";
import fs from "fs";
import { 
    createBrand,
    findBrandByName,
    updateLogoURL,
    getBrandById 
} from '../reposetories/brandRepository';
import{
    uploadBrandLogoToFirebase,
    getBrandImageUrlFromFirebase
} from '../utils/firebaseUtils';

export const createBrandService = async (name: string, file: Express.Multer.File) => {
    // cheking if there is a brand with the same name
    const existingBrand = await findBrandByName(name);

    if (existingBrand) {
        throw new Error('A brand with the same name already exists.');
    }

    // path to the temporary file
    const tempFilePath = file.path;

    try{
        // create a new brand in the database - this step to get the generated id to use when uploading image to firebase
        const newBrand = await createBrand({
            name,
            logo: "", // temporarily set logo as an empty string
        });

        const brandId = newBrand.id;
        const logoUrl = await uploadBrandLogoToFirebase(tempFilePath, brandId);
        await updateLogoURL(brandId, logoUrl);   // updating the temp logo with the actual image URL

        fs.unlinkSync(tempFilePath);             // deleting the temporary file after upload
        return newBrand;

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
    console.error('Error in fetching brand by ID:', error);
    throw error; 
    }
};