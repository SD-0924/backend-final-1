import { Request, Response } from 'express';
import * as discountService from '../services/discountService';

export const getAllDiscounts = async (req: Request, res: Response) => {
    try {
        const discounts = await discountService.getAllDiscounts();
        res.status(200).json(discounts);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

export const getDiscountById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const discount = await discountService.getDiscountById(id);
        if (!discount) {
             res.status(404).json({ message: 'Discount not found' });
             return
        }
        res.status(200).json(discount);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

export const createDiscount = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const discount = await discountService.createDiscount(data);
        res.status(201).json(discount);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

export const updateDiscount = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedDiscount = await discountService.updateDiscount(id, data);
        res.status(200).json(updatedDiscount);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message === 'Discount not found') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

export const deleteDiscount = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await discountService.deleteDiscount(id);
        res.status(204).send();
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message === 'Discount not found') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

export const getDiscountTimeRemainingById = async (req: Request, res: Response) => {
    try {
        const { discountId } = req.params;
        const result = await discountService.getDiscountTimeRemainingById(discountId);
        res.status(200).json(result);
    } catch (error: any) {
        if (error.message === 'Discount not found') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};
