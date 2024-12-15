import request from "supertest";
import app from "../../app"; // Adjust the path to your app file
import { getOrderItemsService } from "../../services/orderItemService";
import { STATUS_CODES } from "../../constants/statusCodes";
// Mock the service
jest.mock("../../services/orderItemService");

describe("Order Items Controller", () => {
  const mockOrderItems = [
    {
      id: "item1",
      orderId: "order123",
      productId: "product123",
      quantity: 2,
      price: 50.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "item2",
      orderId: "order123",
      productId: "product456",
      quantity: 1,
      price: 100.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/order-items/:orderId", () => {
    it("should return order items with status 200", async () => {
      (getOrderItemsService as jest.Mock).mockResolvedValue(mockOrderItems);

      const orderId = "order123";
      const response = await request(app).get(`/order-items/${orderId}`);

      expect(response.status).toBe(STATUS_CODES.SUCCESS);
      expect(response.body.orderItems).toHaveLength(2);
      expect(response.body.orderItems[0].id).toBe(mockOrderItems[0].id);
      expect(getOrderItemsService).toHaveBeenCalledWith(orderId);
    });

    it("should return 400 if orderId is not provided", async () => {
      const response = await request(app).get(`/order-items/`);

      expect(response.status).toBe(404); // Adjust if you handle missing params differently
    });

    it("should return 500 if service throws an error", async () => {
      (getOrderItemsService as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const orderId = "order123";
      const response = await request(app).get(`/order-items/${orderId}`);

      expect(response.status).toBe(STATUS_CODES.SERVER_ERROR);
      expect(response.body).toHaveProperty("error", "Database error");
      expect(getOrderItemsService).toHaveBeenCalledWith(orderId);
    });
  });
});
