import request from "supertest";
import app from "../../app"; // Adjust to your app's location
import * as orderService from "../../services/orderService"; // Mock service

jest.mock("../../services/orderService"); // Mock the order service

describe("Order Controller", () => {
  const testUser = {
    id: "b62f3e21-8a4d-4db4-9182-d38fb314f657",
    email: "test@example.com",
    firstName: "John",
    lastName: "Doe",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /:userId/orders", () => {
    it("should fetch user orders successfully", async () => {
      const mockOrders = [
        { id: "order1", status: "processing" },
        { id: "order2", status: "shipped" },
      ];

      // Mock the service response for fetching orders
      (orderService.getUserOrdersService as jest.Mock).mockResolvedValue(mockOrders);

      const response = await request(app)
        .get(`/${testUser.id}/orders`);

      console.log("Response status:", response.status);
      console.log("Response body:", response.body);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Orders fetched successfully",
        data: mockOrders,
      });
      expect(orderService.getUserOrdersService).toHaveBeenCalledWith(testUser.id);
    });

    it("should return 500 if error occurs while fetching orders", async () => {
      const errorMessage = "Error fetching orders";
      (orderService.getUserOrdersService as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .get(`/${testUser.id}/orders`);

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: "Error fetching user orders",
        error: errorMessage,
      });
    });
  });

  describe("POST /place-order", () => {
    it("should place an order successfully", async () => {
      const mockOrder = {
        id: "order123",
        userId: testUser.id,
        couponId: "b62f3e21-8a4d-4db4-9182-d38fb314f657",
        status: "processing",
      };

      // Mock the service response for placing an order
      (orderService.placeOrderService as jest.Mock).mockResolvedValue(mockOrder);

      const response = await request(app)
        .post("/place-order")
        .send({ userId: testUser.id });

      console.log("Response status:", response.status);
      console.log("Response body:", response.body);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: "Order placed successfully",
        data: mockOrder,
      });
      expect(orderService.placeOrderService).toHaveBeenCalledWith(testUser.id, "b62f3e21-8a4d-4db4-9182-d38fb314f657", "processing");
    });

    it("should return 500 if error occurs while placing an order", async () => {
      const errorMessage = "Error placing order";
      (orderService.placeOrderService as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .post("/place-order")
        .send({ userId: testUser.id });

      expect(response.status).toBe(500);

    });
  });
});
