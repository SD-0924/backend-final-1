import request from "supertest";
import app from "../../app";
import * as cartItemService from "../../services/cartItemService";
import { STATUS_CODES } from "../../constants/statusCodes";
import { ERROR_MESSAGES } from "../../constants/errorMessages";

jest.mock("../../services/cartItemService");  // mocking the order service

describe("CartItem Endpoints", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Adding to the cart endpoint testing
    describe("POST /api/cartS", () => {

        // adding items to the cartItem
        it("should add a product to the cart successfully when the product is not in the cart", async () => {
           // Mock service response
            const mockCartItem = {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                userId: "3fa85f64-5717-4562-b3fc-2c963f67afa6",
                productId: "3fa85f64-5717-4462-b3fc-2c963f66afa6",
                quantity: 2,
            };
            const mockResponse = {
                newCartItem: mockCartItem,
                message: "Product added to cart successfully.",
            };

            (cartItemService.addToCartService as jest.Mock).mockResolvedValue(mockResponse);

            const response = await request(app)
                .post("/api/carts")
                .send({
                    userId: "3fa85f64-5717-4562-b3fc-2c963f67afa6",
                    productId: "3fa85f64-5717-4462-b3fc-2c963f66afa6",
                    quantity: 2,
                });

            expect(response.status).toBe(STATUS_CODES.SUCCESS);
            expect(response.body.success).toBe("Product Added to cart.");
            expect(response.body.cartItem).toEqual(mockCartItem);
            expect(response.body.message).toBe("Product added to cart successfully.");
        });

        // when the product is already in the cart, the quantity is updated 
        it("should update the product quantity if it already exists in the cart", async () => {
            // Mock service response
            const mockCartItem = {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                userId: "3fa85f64-5717-4562-b3fc-2c963f67afa6",
                productId: "3fa85f64-5717-4462-b3fc-2c963f66afa6",
                quantity: 5,
            };
            const mockResponse = {
                updatedCartItem: mockCartItem,
                message: "Product quantity updated successfully.",
            };

            (cartItemService.addToCartService as jest.Mock).mockResolvedValue(mockResponse);

            const response = await request(app)
                .post("/api/carts")
                .send({
                    userId: "3fa85f64-5717-4562-b3fc-2c963f67afa6",
                    productId: "3fa85f64-5717-4462-b3fc-2c963f66afa6",
                    quantity: 3,
                });

            expect(response.status).toBe(STATUS_CODES.SUCCESS);
            expect(response.body.success).toBe("Product Added to cart.");
            expect(response.body.cartItem).toEqual(mockCartItem);
            expect(response.body.message).toBe("Product quantity updated successfully.");
        });

        // when the user is not exists
        it("should return 404 if the user does not exist", async () => {
            (cartItemService.addToCartService as jest.Mock).mockRejectedValue(
                new Error(ERROR_MESSAGES.USER_NOT_FOUND)
            );

            const response = await request(app)
                .post("/api/carts")
                .send({
                    userId: "3fa85f64-5717-4562-b3fc-2c963f67afa6",
                    productId: "3fa85f64-5717-4462-b3fc-2c963f66afa6",
                    quantity: 2,
                });

            expect(response.status).toBe(STATUS_CODES.NOT_FOUND);
            expect(response.body.message).toBe(ERROR_MESSAGES.USER_NOT_FOUND);
        });

        // when the product is not exist
        it("should return 404 if the product does not exist", async () => {
        (cartItemService.addToCartService as jest.Mock).mockRejectedValue(
            new Error(ERROR_MESSAGES.PRODUCT_NOT_FOUND)
        );

        const response = await request(app)
            .post("/api/carts")
            .send({
                userId: "3fa85f64-5717-4562-b3fc-2c963f67afa6",
                productId: "3fa85f64-5717-4462-b3fc-2c963f66afa6",
                quantity: 2,
            });

        expect(response.status).toBe(STATUS_CODES.NOT_FOUND);
        expect(response.body.message).toBe(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
        });
    });

    // Deleting Items from the cart
    describe("DELETE /api/cartS/:cartId", () => {

        // delete it successfully
        it("should delete the cart item successfully when a valid cartId is provided", async () => {
            // Mock service response for successful deletion
            (cartItemService.deleteCartItemService as jest.Mock).mockResolvedValue(true);

            const cartId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
            const response = await request(app).delete(`/api/carts/${cartId}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe(`Cart item with ID ${cartId} deleted successfully.`);
        });

        it("should return 404 if the cart item does not exist", async () => {
            // Mock service response for non-existing cart item
            (cartItemService.deleteCartItemService as jest.Mock).mockRejectedValue(
                new Error("cartId not found")
            );

            const cartId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
            const response = await request(app).delete(`/api/carts/${cartId}`);

            expect(response.status).toBe(STATUS_CODES.NOT_FOUND);
            expect(response.body.message).toBe("cartItem not found");
        });
    });

    // testing getting the cart items for specific user
    describe("GET /api/carts/:userId", () => {

        // gettign cartItems successfully for specific userId
        it("should fetch cart items successfully when a valid userId is provided", async () => {

            const mockResponse = {
            cartItems: [
                {
                    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    userId: "4fa85f64-5717-4562-b3fc-2c963f66afa6",
                    productId: "5fa85f64-5717-4562-b3fc-2c963f66afa6",
                    quantity: 2,
                    priceBeforeDiscount: 100,
                    priceAfterDiscount: 90,
                    totalPriceBeforeDiscount: 200,
                    totalPriceAfterDiscount: 180,
                    itemDiscount: 20,
                    product: {
                        name: "Product 1",
                        price: 100,
                        finalPrice: 90,
                        stockQuantity: 10,
                        discountPercentage: 10,
                        ratingAverage: 4.5,
                        ratingTotal: 100,
                        brandName: "Brand A",
                        categoryName: "Category X",
                        imageUrl: "https://example.com/image1.png",
                    },
                },
            ],
            summary: {
                subtotal: 200,
                discount: 20,
                grandTotal: 180,
            },
        };

        (cartItemService.getCartItemsWithProductDetailsService as jest.Mock).mockResolvedValue(mockResponse);

        const userId = "4fa85f64-5717-4562-b3fc-2c963f66afa6";
        const response = await request(app).get(`/api/carts/${userId}`);

        expect(response.status).toBe(STATUS_CODES.SUCCESS);
        expect(response.body).toEqual(mockResponse);
    });

    // when the user does not exists at all
    it("should return 404 if the user does not exist", async () => {
        (cartItemService.getCartItemsWithProductDetailsService as jest.Mock).mockRejectedValue(
            new Error(ERROR_MESSAGES.USER_NOT_FOUND)
        );

        const userId = "4fa85f64-5717-4562-b3fc-2c963f66afa6";
        const response = await request(app).get(`/api/carts/${userId}`);

        expect(response.status).toBe(STATUS_CODES.NOT_FOUND);
        expect(response.body.error).toBe(ERROR_MESSAGES.USER_NOT_FOUND);
    });

    // when the user is exists, but has no items (products) in his carts
    it("should return 404 if no cart items are found for the user", async () => {
        (cartItemService.getCartItemsWithProductDetailsService as jest.Mock).mockRejectedValue(
            new Error("No cart items found for this user.")
        );

        const userId = "4fa85f64-5717-4562-b3fc-2c963f66afa6";
        const response = await request(app).get(`/api/carts/${userId}`);

        expect(response.status).toBe(STATUS_CODES.NOT_FOUND);
        expect(response.body.error).toBe("No cart items found for this user.");
    });
    });

    // testing updating quantity endpoints
    describe("PUT /api/carts/:cartId", () => {

        it("should update the quantity of the cart item successfully when a valid cartId is provided", async () => {
            const cartId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
            const updatedCartItem = {
                id: cartId,
                userId: "4fa85f64-5717-4562-b3fc-2c963f66afa6",
                productId: "5fa85f64-5717-4562-b3fc-2c963f66afa6",
                quantity: 5, // Updated quantity
            };

            const mockResponse = {
                updatedCartItem,
                message: "Cart item quantity updated successfully.",
            };

            (cartItemService.updateCartItemQuantityService as jest.Mock).mockResolvedValue(mockResponse);

            const response = await request(app)
                .put(`/api/carts/${cartId}`)
                .send({ quantity: 5 });

            expect(response.status).toBe(STATUS_CODES.SUCCESS);
            expect(response.body.message).toBe("Cart item quantity updated successfully.");
            expect(response.body.updatedCartItem).toEqual(updatedCartItem);
        });
    });
});