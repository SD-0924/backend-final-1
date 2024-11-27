import { Request, Response } from 'express';
import { createBrandService } from '../services/brandService';

export const createBrand = async (req: Request, res: Response) =>{
    try {
        console.log("inside controller");
        // extract the product name from the body and the file to be uploaded to the firbase
        const { name } = req.body;
        const file = req.file;
        console.log("calling service");
        const newBrand = await createBrandService(name, file!);

        res.status(201).json({
            success: true,
            message: 'Brand created successfully',
        });
    }catch(error){
        console.error("Error in Creating Brand.");
        res.status(500).json({
            success: false,
            message: 'Error creating brand',
        });
    }
};