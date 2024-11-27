import multer from 'multer';
import { FileFilterCallback } from 'multer';
import { AllowedImageTypes } from '../utils/enums';
import path from 'path';
import fs from 'fs';

// Define the temporary upload directory
const tempDir = './tmp_uploads/';

// Ensure the directory exists
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

// Configure Multer to use disk storage
const storage = multer.diskStorage({

    destination: (req, file, cb) =>{
        cb(null, tempDir);
    },

    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

// File filter to allow only image types
const fileFilter = (req: any, file: Express.Multer.File, cb: FileFilterCallback) => {
    const isAllowedType = Object.values(AllowedImageTypes).includes(file.mimetype as AllowedImageTypes);

    if (isAllowedType) {
        cb(null, true); // accept the file
    } else {
        console.log(`Invalid file type: ${file.mimetype}. Only JPEG, PNG, and GIF images are allowed.`);
        cb(null, false); // reject the file
    }
};

// Multer middleware
const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
