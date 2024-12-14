import request from "supertest";
import app from "../../app";
import {
  addRating,
  editRating,
  deleteRating,
  getRatingsByUserId,
  getRatingsByProductId,
  calculateRating,
  countRatingsForProduct,
} from "../../services/ratingService";
import { ERROR_MESSAGES } from "../../constants/errorMessages";

import { STATUS_CODES } from "../../constants/statusCodes";
jest.mock("../../services/ratingService");

describe("Rating Endpoints", () => {
  const mockRating = {
    id: "rating123",
    productId: "product123",
    userId: "user123",
    rating: 5,
    comment: "Excellent!",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/ratings", () => {
    it("should add a new rating and return it with status 201", async () => {
      (addRating as jest.Mock).mockResolvedValue(mockRating);

      const response = await request(app).post("/api/ratings").send(mockRating);

      expect(response.status).toBe(STATUS_CODES.CREATED);
      expect(response.body).toEqual(mockRating);
      expect(addRating).toHaveBeenCalledWith(mockRating);
    });
  });

  describe.skip("PUT /api/ratings/:ratingId", () => {
    it("should update a rating and return it with status 200", async () => {
      (editRating as jest.Mock).mockResolvedValue(mockRating);

      const response = await request(app)
        .put(`/api/ratings/${mockRating.id}`)
        .send({ comment: "Updated comment" });

      expect(response.status).toBe(STATUS_CODES.SUCCESS);
      expect(response.body).toEqual(mockRating);
      expect(editRating).toHaveBeenCalledWith(mockRating.id, {
        comment: "Updated comment",
      });
    });
  });

  describe.skip("DELETE /api/ratings/:ratingId", () => {
    it("should delete a rating and return status 204", async () => {
      (deleteRating as jest.Mock).mockResolvedValue(true);

      const response = await request(app).delete(
        `/api/ratings/${mockRating.id}`
      );

      expect(response.status).toBe(STATUS_CODES.NO_CONTENT);
      expect(deleteRating).toHaveBeenCalledWith(mockRating.id);
    });
  });

  describe("GET /api/ratings/user/:userId", () => {
    it("should return ratings by user ID with status 200", async () => {
      (getRatingsByUserId as jest.Mock).mockResolvedValue([mockRating]);

      const response = await request(app).get(
        `/api/ratings/user/${mockRating.userId}`
      );

      expect(response.status).toBe(STATUS_CODES.SUCCESS);
      expect(response.body).toEqual([mockRating]);
      expect(getRatingsByUserId).toHaveBeenCalledWith(mockRating.userId);
    });
  });

  describe("GET /api/ratings/product/:productId", () => {
    it("should return ratings by product ID with status 200", async () => {
      (getRatingsByProductId as jest.Mock).mockResolvedValue([mockRating]);

      const response = await request(app).get(
        `/api/ratings/product/${mockRating.productId}`
      );

      expect(response.status).toBe(STATUS_CODES.SUCCESS);
      expect(response.body).toEqual([mockRating]);
      expect(getRatingsByProductId).toHaveBeenCalledWith(mockRating.productId);
    });
  });

  describe("GET /api/ratings/product/:productId/average", () => {
    it("should return the average rating with status 200", async () => {
      (calculateRating as jest.Mock).mockResolvedValue(4.5);

      const response = await request(app).get(
        `/api/ratings/product/${mockRating.productId}/average`
      );

      expect(response.status).toBe(STATUS_CODES.SUCCESS);
      expect(response.body).toEqual({ averageRating: 4.5 });
      expect(calculateRating).toHaveBeenCalledWith(mockRating.productId);
    });
  });

  describe("GET /api/ratings/product/:productId/count", () => {
    it("should return the count of ratings with status 200", async () => {
      (countRatingsForProduct as jest.Mock).mockResolvedValue(10);

      const response = await request(app).get(
        `/api/ratings/product/${mockRating.productId}/count`
      );

      expect(response.status).toBe(STATUS_CODES.SUCCESS);
      expect(response.body).toEqual({ count: 10 });
      expect(countRatingsForProduct).toHaveBeenCalledWith(
        mockRating.productId
      );
    });
  });
});
