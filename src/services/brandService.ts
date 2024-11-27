import { createBrand, findBrandByName } from '../reposetories/brandRepository';
import { bucket } from '../config/firbaseConf';
import path from 'path';
import fs from 'fs';

// Function to upload the image to Firebase Storage
const uploadImageToFirebase = async (filePath: string, brandName: string): Promise<string> => {
    console.log("inside upload file");
    const file = fs.readFileSync(filePath); // Read the temporary file
    const ext = path.extname(filePath);
    console.log(file);
    console.log(ext);
    const remoteFileName = `logos/${brandName}${ext}`;
    console.log(remoteFileName);
    console.log("==============");
    const fileUpload = bucket.file(remoteFileName);
    console.log(fileUpload);
    try {
        console.log("inside try");
        await fileUpload.save(file, { contentType: 'image/jpeg' }); // Upload to Firebase
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
        return publicUrl;
    } catch (error) {
        console.error('Error uploading file to Firebase:', error);
        throw new Error('Error during file upload');
    }
};

// Function to create a new brand
export const createBrandService = async (name: string, file: Express.Multer.File) => {
    // Check if there is already a brand with the same name
    const existingBrand = await findBrandByName(name);
    if (existingBrand) {
        throw new Error('A brand with the same name already exists.');
    }

    // Path to the temporary file
    const tempFilePath = file.path;

    console.log(tempFilePath);

    try {
        // Upload the logo to Firebase and get the URL
        console.log("trying to upload the file")
        const logoUrl = await uploadImageToFirebase(tempFilePath, name);

        // Brand data to be stored in the database
        const brandData = {
            name,
            logo: logoUrl,
        };

        // Create the new brand in the database
        const newBrand = await createBrand(brandData);

        // Delete the temporary file after upload
        fs.unlinkSync(tempFilePath);

        return newBrand;
    } catch (error) {
        // Clean up in case of an error
        fs.unlinkSync(tempFilePath);
        throw error;
    }
};
