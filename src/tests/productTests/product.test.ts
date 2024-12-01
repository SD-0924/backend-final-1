import request from "supertest";
import { app } from "../../app"; // Adjust path to your Express app
import { getAllProductsService } from "../../services/productService";
import Product from "../../models/Product";

// Mock the service
jest.mock("../../services/productService");

describe("GET /api/products", () => {
  const mockProducts = [
    {
      id: "123",
      name: "Product 1",
      description: "Description for Product 1",
      price: 100.0,
      stockQuantity: 10,
      isLimitedEdition: false,
      isFeatured: true,
      brandId: "brand123",
      categoryId: "category123",
      imageUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "456",
      name: "Product 2",
      description: "Description for Product 2",
      price: 200.0,
      stockQuantity: 5,
      isLimitedEdition: true,
      isFeatured: false,
      brandId: "brand456",
      categoryId: "category456",
      imageUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of products with status 201", async () => {
    // Mock the service to return the mock products
    (getAllProductsService as jest.Mock).mockResolvedValue(mockProducts);

    const response = await request(app).get("/api/products");

    expect(response.status).toBe(201);
    expect(response.body).toHaveLength(2);

    // Validate product details
    const product1 = response.body[0];
    expect(product1.name).toBe("Product 1");
    expect(product1.imageUrl).toBe(
      "https://shop.songprinting.com/global/images/PublicShop/ProductSearch/prodgr_default_300.png"
    );

    const product2 = response.body[1];
    expect(product2.name).toBe("Product 2");
    expect(product2.imageUrl).toBe(
      "https://shop.songprinting.com/global/images/PublicShop/ProductSearch/prodgr_default_300.png" // Default image URL
    );

    // Ensure the service was called once
    expect(getAllProductsService).toHaveBeenCalledTimes(1);
  });

  it("should return 500 if service throws an error", async () => {
    // Mock the service to throw an error
    (getAllProductsService as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    const response = await request(app).get("/api/products");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to fetch products" });

    // Ensure the service was called once
    expect(getAllProductsService).toHaveBeenCalledTimes(1);
  });
});
