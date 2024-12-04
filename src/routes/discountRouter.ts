import { Router } from 'express';
import {
    getAllDiscounts,
    getDiscountById,
    createDiscount,
    updateDiscount,
    deleteDiscount,
    getDiscountTimeRemainingById
} from '../controllers/discountController';
import { authenticateJWT, isAdmin } from '../middlewares/authMiddleware';
import { validateRequest } from '../middlewares/validateRequest';
import {
    validateCreateDiscount,
    validateUpdateDiscount,
    validateGetDiscountById,
} from '../validations/discountValidation';

const router = Router();

router.get('/api/discounts', authenticateJWT, getAllDiscounts);
router.get('/api/discounts/:id', authenticateJWT, validateGetDiscountById, validateRequest, getDiscountById);
router.get('/api/discounts/:discountId/time-remaining', getDiscountTimeRemainingById);
router.post('/api/discounts', authenticateJWT, isAdmin, validateCreateDiscount, validateRequest, createDiscount);
router.put('/api/discounts/:id', authenticateJWT, isAdmin, validateUpdateDiscount, validateRequest, updateDiscount);
router.delete('/api/discounts/:id', authenticateJWT, isAdmin, deleteDiscount);

export default router;
