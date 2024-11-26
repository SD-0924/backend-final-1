import { createBrand, findBrandByName } from '../reposetories/brandRepository';
import { bucket } from '../config/firbaseConf';
import path from 'path';



// function to upload to firebase storage
const uploadImageToFirebase = async (file: Express.Multer.File, brandName: string): Promise<string> => {
    // checking the file
    if (!file) {
    throw new Error('File is required for uploading.');
    }

    const remoteFileName = `logos/${brandName}${path.extname(file.originalname)}`;  // using brand name for the file name
    const fileUpload = bucket.file(remoteFileName);
    await fileUpload.save(file.buffer, { contentType: file.mimetype }); // uploading the image to the firbase using buffer

    // getting the public URL of the uploaded file
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
    console.log('File uploaded successfully. Public URL:', publicUrl);

    return publicUrl;

};

// create new brand record
export const createBrandService = async (name: string, file: Express.Multer.File) => {

    // check if there is brand with the same name
    const existingBrand = await findBrandByName(name);
    // throw an error
    if (existingBrand) {
        throw new Error('A brand with the same name already exists.');
    }

    // uploading the logo to Firebase storage and returning the image url
    const logoUrl = await uploadImageToFirebase(file, name);

    // brand data to be stored in DB
    const brandData = {
    name,
    logo: logoUrl, 
    };

    // creating a new brand in the database
    const newBrand = await createBrand(brandData);

    return newBrand;
}