import express from 'express';

import { addRatingController, editRatingController, deleteRatingController, getRatingsByUserIdController, getRatingsByProductIdController, calculateRatingController, countRatingsController } from '../controllers/ratingController';
import { authenticateJWT, isAdmin } from '../middlewares/authMiddleware';
import {validateRating} from '../validations/ratingValidation'
const router = express.Router();

router.post('/api/ratings', authenticateJWT , validateRating, addRatingController);
router.put('/api/ratings/:ratingId', authenticateJWT, validateRating,editRatingController);
router.delete('/api/ratings/:ratingId', authenticateJWT, validateRating,deleteRatingController);
router.get('/api/ratings/user/:userId', authenticateJWT, validateRating, getRatingsByUserIdController);
router.get('/api/ratings/product/:productId', authenticateJWT, validateRating, getRatingsByProductIdController);
router.get('/api/ratings/product/:productId/average', authenticateJWT, validateRating, calculateRatingController);
router.get('/api/ratings/product/:productId/count', authenticateJWT, validateRating, countRatingsController);

export default router;
