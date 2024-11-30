import { bucket } from "../config/firbaseConf";
import fs from "fs";
import path from "path";

export const uploadProductImageToFirebase = async (
  filePath: string,
  productName: string,
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
    console.error("Error uploading product image:", error);
    throw new Error("Failed to upload product image.");
  }
};


export const deleteProductImageFromFirebase = async (imageUrl: string): Promise<void> => {
  const fileName = imageUrl.split(`${bucket.name}/`)[1];
  const file = bucket.file(fileName);

  try {
    await file.delete();
    console.log(`Successfully deleted file: ${fileName}`);
  } catch (error) {
    console.error(`Failed to delete file: ${fileName}`, error);
    throw new Error("Failed to delete product image.");
  }
};


export const getProductImageUrlFromFirebase = async (imageUrl: string): Promise<string> => {
  const fileName = imageUrl.split(`${bucket.name}/`)[1];
  const file = bucket.file(fileName);
  try {
    const [fileExists] = await file.exists();
    if (fileExists) {
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-09-2491' // Set an appropriate expiration date
      });
      return url;
    }
  } catch (error) {
    console.error("Error fetching product image:", error);
    return imageUrl; // Return original URL if there's an error
  }
  return imageUrl;
};
