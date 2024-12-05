import express from 'express';
import { addRatingController, editRatingController, deleteRatingController, getRatingsByUserIdController, getRatingsByProductIdController, calculateRatingController, countRatingsController } from '../controllers/ratingController';
import { authenticateJWT, isAdmin } from '../middlewares/authMiddleware';
import {validateRating} from '../validations/ratingValidation'
const router = express.Router();

router.post('/ratings', authenticateJWT , validateRating, addRatingController);
router.put('/ratings/:ratingId', authenticateJWT, validateRating,editRatingController);
router.delete('/ratings/:ratingId', authenticateJWT, validateRating,deleteRatingController);
router.get('/ratings/user/:userId', authenticateJWT, validateRating, getRatingsByUserIdController);
router.get('/ratings/product/:productId', authenticateJWT, validateRating, getRatingsByProductIdController);
router.get('/ratings/product/:productId/average', authenticateJWT, validateRating, calculateRatingController);
router.get('/ratings/product/:productId/count', authenticateJWT, validateRating, countRatingsController);

export default router;
