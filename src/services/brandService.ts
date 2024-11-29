import { createBrand, findBrandByName, getBrandById } from '../reposetories/brandRepository';
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

// function to download an image from Firebase Storage
const downloadImageFromFirebase = async (fileName: string): Promise<Buffer> => {
    // Create a reference to the file in Firebase Storage using the provided file path
    const file = bucket.file(fileName);
    try {
        // fetching the file from storage
        const [fileContents] = await file.download();
        return fileContents;

    } catch (error) {

        console.error('Error downloading file from Firebase:', error);
        throw new Error('Error during file download');
        
    }
};

export const fetchBrandByIdService  = async(id: string) =>{
    try {
        const brand = await getBrandById(id);
        // if the brand is null, then its not 
        if (!brand) {
            return null;
        }
        // extracting the file from the logo field
        const logoUrl = brand.logo; 
        const fileName = logoUrl.replace(`https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}/`, '');

        // Fetch the logo image from Firebase Storage
        const imageBuffer = await downloadImageFromFirebase(fileName);

        // Convert the image buffer to Base64 for sending in the response
        const base64Logo = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

        // Return the brand details along with the logo in Base64 format
        return {
            id: brand.id,
            name: brand.name,
            logo: base64Logo, // Attach the Base64 image to the response
        };
    } catch (error) {
        console.error('Error in fetching brand by ID:', error);
        throw error;
    }

};