import exp from "constants";
import { bucket } from "../config/firbaseConf";
import fs from "fs";
import path from "path";
import logger from "../logger";

export const uploadProductImageToFirebase = async (
  filePath: string,
  productName: string
): Promise<string> => {
  const file = fs.readFileSync(filePath);
  const ext = path.extname(filePath);
  const remoteFileName = `products/${productName}-${ext}`;
  const fileUpload = bucket.file(remoteFileName);

  try {
    await fileUpload.save(file, { contentType: "image/jpeg" });
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
    return publicUrl;
  } catch (error) {
    logger.error("Error uploading product image:", error);
    throw new Error("Failed to upload product image.");
  }
};

export const deleteProductImageFromFirebase = async (
  imageUrl: string
): Promise<void> => {
  const fileName = imageUrl.split(`${bucket.name}/`)[1];
  const file = bucket.file(fileName);

  try {
    await file.delete();
    logger.info(`Successfully deleted file: ${fileName}`);
  } catch (error) {
    logger.error(`Failed to delete file: ${fileName}`, error);
    throw new Error("Failed to delete product image.");
  }
};

export const getProductImageUrlFromFirebase = async (
  imageUrl: string
): Promise<string> => {
  if (!imageUrl.includes(bucket.name)) {
    logger.error("Invalid image URL:", imageUrl);
    throw new Error("Invalid image URL.");
  }

  const fileName = imageUrl.split(`${bucket.name}/`)[1];
  if (!fileName) {
    logger.error("Invalid file name:", fileName);
    throw new Error("Invalid file name extracted from image URL.");
  }

  const file = bucket.file(fileName);
  try {
    const [fileExists] = await file.exists();
    if (fileExists) {
      const [url] = await file.getSignedUrl({
        action: "read",
        expires: "03-09-2491", // Set an appropriate expiration date
      });
      return url;
    }
  } catch (error) {
    logger.error("Error fetching product image:", error);
    return imageUrl; // Return original URL if there's an error
  }
  return imageUrl;
};

// Brands Functions
export const uploadBrandLogoToFirebase = async (
  filePath: string,
  brandId: string
): Promise<string> => {
  const file = fs.readFileSync(filePath); // reading the image file from the temp folder
  const ext = path.extname(filePath); // extracting the file extension (e.g., .jpg, .png) from the file path

  /**
   * Here,  we are defining the name of the file as it will be stored in Firebase Storage.
   * The file will be stored in the "logos" folder with the brandId as the name.
   * Example: If `brandId` is "12345" and the file is a .jpg, the file will be "logos/12345.jpg".
   */
  const remoteFileName = `logos/${brandId}${ext}`;
  const fileUpload = bucket.file(remoteFileName); // getting a reference to the file in Firebase Storage
  try {
    await fileUpload.save(file, { contentType: "image/jpeg" }); // uploading the image file to Firebase Storage with the specified content type
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`; // generating a public URL for accessing the uploaded image to store in the DB
    return publicUrl;
  } catch (error) {
    logger.error("Error uploading file to Firebase:", error);
    throw new Error("Error during file upload");
  }
};

export const getBrandImageUrlFromFirebase = async (
  imageUrl: string
): Promise<string> => {
  const fileName = imageUrl.split(`${bucket.name}/`)[1];
  const file = bucket.file(fileName);

  try {
    const [fileExists] = await file.exists();
    if (fileExists) {
      const [url] = await file.getSignedUrl({
        action: "read",
        expires: "03-09-2491",
      });
      return url;
    }
  } catch (error) {
    logger.error("Error fetching product image:", error);
    return imageUrl;
  }
  return imageUrl;
};

export const deleteBrandImageFromFirebase = async (
  fileName: string
): Promise<void> => {
  try {
    const file = bucket.file(fileName);
    await file.delete();
    logger.info(`File ${fileName} deleted successfully from Firebase.`);
  } catch (error) {
    logger.error(`Error deleting file ${fileName} from Firebase:`, error);
    throw new Error("Error deleting file from Firebase");
  }
};
