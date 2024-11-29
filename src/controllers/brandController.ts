import { Request, Response } from 'express';
import { createBrandService, fetchBrandByIdService } from '../services/brandService';

export const createBrand = async (req: Request, res: Response) =>{
    try {
        // extract the product name from the body and the file to be uploaded to the firbase
        const { name } = req.body;
        const file = req.file;

        const newBrand = await createBrandService(name, file!);

        res.status(201).json({
            success: true,
            message: 'Brand created successfully',
            data: newBrand,
        });
    }catch(error){
        console.error("Error in Creating Brand.");
        res.status(500).json({
            success: false,
            message: 'Error creating brand',
        });
    }
};

export const getBrandById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const brand = await fetchBrandByIdService(id); 

        if (!brand) {
            res.status(404).json({ message: 'Brand not found.' });
        }else{
            res.status(200).json(brand); 
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
};