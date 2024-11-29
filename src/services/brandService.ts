import { createBrand, findBrandByName } from '../reposetories/brandRepository';
import { bucket } from '../config/firbaseConf'
import path from 'path';
import fs from 'fs';

// function to upload the image to Firebase Storage
const uploadImageToFirebase = async (filePath: string, brandName: string): Promise<string> => {

    const file = fs.readFileSync(filePath);  // reading the image file from the temp folder
    const ext = path.extname(filePath);      // extracting the file extension (e.g., .jpg, .png) from the file path

    /**
     * Here, we define the name of the file as it will be stored in Firebase Storage.
     * the file will be stored in a folder named "logos", with the name being the brand name plus its extension.
     * Example: If `brandName` is "ExampleBrand" and the file is a .jpg, the stored file will be "logos/ExampleBrand.jpg".
     */
    const remoteFileName = `logos/${brandName}${ext}`; 

    // getting a reference to the file in Firebase Storage
    const fileUpload = bucket.file(remoteFileName);

    try {
        // saving the image file to Firebase Storage with a specified content type (image/jpeg in our case)
        await fileUpload.save(file, { contentType: 'image/jpeg' }); 
        // generating a public URL for accessing the uploaded image to be stored in the DB
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

    // path to the temporary file
    const tempFilePath = file.path;

    try {
        // uploading the logo image to Firebase and get the URL
        const logoUrl = await uploadImageToFirebase(tempFilePath, name);

        // brand data record to be stored in the DB
        const brandData = {
            name,
            logo: logoUrl,
        };

        // creating the new brand in the database
        const newBrand = await createBrand(brandData);

        // deleting the temporary file after upload
        fs.unlinkSync(tempFilePath);
        return newBrand;

    } catch (error) {
        // clean up the image file in case of an error
        fs.unlinkSync(tempFilePath);
        throw error;
    }
};