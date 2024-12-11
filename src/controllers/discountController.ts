import { STATUS_CODES } from "../constants/statusCodes";
import { Request, Response } from "express";
import * as discountService from "../services/discountService";

export const getAllDiscounts = async (req: Request, res: Response) => {
  try {
    const discounts = await discountService.getAllDiscounts();
    res.status(STATUS_CODES.SUCCESS).json(discounts);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    } else {
      res
        .status(STATUS_CODES.SERVER_ERROR)
        .json({ error: "An unknown error occurred" });
    }
  }
};

export const getDiscountById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const discount = await discountService.getDiscountById(id);
    if (!discount) {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "Discount not found" });
      return;
    }
    res.status(STATUS_CODES.SUCCESS).json(discount);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    } else {
      res
        .status(STATUS_CODES.SERVER_ERROR)
        .json({ error: "An unknown error occurred" });
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
      res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    } else {
      res
        .status(STATUS_CODES.SERVER_ERROR)
        .json({ error: "An unknown error occurred" });
    }
  }
};

export const updateDiscount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedDiscount = await discountService.updateDiscount(id, data);
    res.status(STATUS_CODES.SUCCESS).json(updatedDiscount);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === "Discount not found") {
        res.status(STATUS_CODES.NOT_FOUND).json({ message: error.message });
      } else {
        res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
      }
    } else {
      res
        .status(STATUS_CODES.SERVER_ERROR)
        .json({ error: "An unknown error occurred" });
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
      if (error.message === "Discount not found") {
        res.status(STATUS_CODES.NOT_FOUND).json({ message: error.message });
      } else {
        res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
      }
    } else {
      res
        .status(STATUS_CODES.SERVER_ERROR)
        .json({ error: "An unknown error occurred" });
    }
  }
};

const formatTime = (milliseconds: number) => {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const days = Math.floor(hours / 24);
  const hoursRemaining = hours % 24;

  return `${days} days, ${hoursRemaining} hours, ${minutes} minutes`;
};

export const getDiscountTimeRemainingById = async (
  req: Request,
  res: Response
) => {
  const { discountId } = req.params;

  try {
    const discount = await discountService.getDiscountById(discountId);

    if (!discount) {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "Discount not found" });
      return;
    }

    const currentTime = new Date();
    const discountEndTime = new Date(discount.endDate);

    const remainingTime = discountEndTime.getTime() - currentTime.getTime();

    if (remainingTime <= 0) {
      res.status(STATUS_CODES.SUCCESS).json({
        remainingTime: 0,
        message: "Discount has expired",
        formattedTime: "0 days, 0 hours, 0 minutes",
      });
      return;
    }

    const formattedTime = formatTime(remainingTime);

    res.status(STATUS_CODES.SUCCESS).json({
      remainingTime,
      message: "Discount is still active",
      formattedTime,
    });
    return;
  } catch (error) {
    console.error(error);
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: "Internal server error" });
    return;
  }
};
