import { createBrand, findBrandByName, getBrandById, getAllBrandsRepo, deleteBrandByIdRepo } from '../reposetories/brandRepository';
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

const getBrandImageUrlFromFirebase = async (imageUrl: string): Promise<string> => {
    const fileName = imageUrl.split(`${bucket.name}/`)[1];
    const file = bucket.file(fileName);

    try {
        const [fileExists] = await file.exists();
        if (fileExists) {
        const [url] = await file.getSignedUrl({
            action: 'read', 
            expires: '03-09-2491' 
        });
        return url; 
        }
    } catch (error) {
        console.error("Error fetching product image:", error);
        return imageUrl; 
    }
    return imageUrl;
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
                    console.warn(`Failed to fetch image for brand ID ${brand.id}:`, error);
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
            brands: brandsWithLogos,       // the processed brand details
        };

    } catch (error) {
        console.error('Error in fetching all brands:', error);
        throw new Error('Service error');
    }
};


//  to delete an image from Firebase Storage
export const deleteImageFromFirebase = async (fileName: string): Promise<void> => {
    try {
        const file = bucket.file(fileName);
        await file.delete();
        console.log(`File ${fileName} deleted successfully from Firebase.`);
    } catch (error) {
        console.error(`Error deleting file ${fileName} from Firebase:`, error);
        throw new Error('Error deleting file from Firebase');
    }
};

export const deleteBrandByIdService = async (id: string): Promise<void> => {
    try {
        const brand = await getBrandById(id);

        if (!brand) {
            console.log("Brand is not found to delete")
            throw new Error('Brand not found');
        }
        const fileName = brand.logo.replace(`https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}/`,'');

        // delete the image from Firebase
        await deleteImageFromFirebase(fileName);

        // Delete the brand record from the database
        await deleteBrandByIdRepo(id);

    } catch (error) {
        console.error(`Error deleting brand with ID ${id}:`, error);
        throw error;
    }
};