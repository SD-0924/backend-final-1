import { STATUS_CODES } from "../constants/statusCodes";
import { Request, Response } from "express";
import {
  addRating,
  editRating,
  deleteRating,
  getRatingsByUserId,
  getRatingsByProductId,
  calculateRating,
  countRatingsForProduct,
} from "../services/ratingService";

export const addRatingController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const ratingData = req.body;
    const newRating = await addRating(ratingData);
    res.status(201).json(newRating);
  } catch (error: any) {
    res.status(STATUS_CODES.BAD_REQUEST).json({ error });
  }
};

export const editRatingController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { ratingId } = req.params;
    const updatedData = req.body;
    const updatedRating = await editRating(ratingId, updatedData);
    res.status(STATUS_CODES.SUCCESS).json(updatedRating);
  } catch (error: any) {
    res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.message });
  }
};

export const deleteRatingController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { ratingId } = req.params;
    await deleteRating(ratingId);
    res.status(204).send();
  } catch (error: any) {
    res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.message });
  }
};

export const getRatingsByUserIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const ratings = await getRatingsByUserId(userId);
    res.status(STATUS_CODES.SUCCESS).json(ratings);
  } catch (error: any) {
    res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.message });
  }
};

export const getRatingsByProductIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    const ratings = await getRatingsByProductId(productId);
    res.status(STATUS_CODES.SUCCESS).json(ratings);
  } catch (error: any) {
    res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.message });
  }
};

export const calculateRatingController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    const averageRating = await calculateRating(productId);
    res.status(STATUS_CODES.SUCCESS).json({ averageRating });
  } catch (error: any) {
    res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.message });
  }
};

export const countRatingsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    const count = await countRatingsForProduct(productId);
    res.status(STATUS_CODES.SUCCESS).json({ count });
  } catch (error: any) {
    res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.message });
  }
};
