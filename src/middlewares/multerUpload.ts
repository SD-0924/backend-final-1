import multer from 'multer';
import { FileFilterCallback } from 'multer';
import { AllowedImageTypes } from '../utils/enums';


/* We will store the files temporarly in the memory before beign uploaded to the firebase */
const storage = multer.memoryStorage();

// filter the uploaded files such that only images are accepted
const fileFilter = (req: any, file: Express.Multer.File, cb: FileFilterCallback) => {

    // only allowed images types
    const isAllowedType = Object.values(AllowedImageTypes).includes(file.mimetype as AllowedImageTypes );

    if (isAllowedType) {
        cb(null, true); // accept the file
    } else {
        console.log(`Invalid file type: ${file.mimetype}. Only JPEG, PNG, and GIF images are allowed.`);
        cb(null, false); // reject the file
    }
};

// creating multer middleware
const upload = multer({storage: storage, fileFilter: fileFilter});

export default upload;