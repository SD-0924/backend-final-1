import multer from 'multer';
import { FileFilterCallback } from 'multer';
import { AllowedImageTypes } from '../utils/enums';
import path from 'path';
import fs from 'fs';

// defining the temporary upload directory to store the images inside it before uploading it to the firebase
const tempDir = './tmp_uploads/';

// ensuring the directory exists, otherwise create it
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

// configuring the Multer Middleware to use disk storage
const storage = multer.diskStorage({

    destination: (req, file, cb) =>{
        cb(null, tempDir);
    },

    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

// file filter to allow only image types 
const fileFilter = (req: any, file: Express.Multer.File, cb: FileFilterCallback) => {
    const isAllowedType = Object.values(AllowedImageTypes).includes(file.mimetype as AllowedImageTypes);

    if (isAllowedType) {
        cb(null, true); // accept the file
    } else {
        console.log(`Invalid file type: ${file.mimetype}. Only JPEG, PNG, and GIF images are allowed.`);
        cb(null, false); // reject the file
    }
};

// Multer Middleware
const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;