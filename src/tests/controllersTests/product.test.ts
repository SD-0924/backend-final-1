import request from "supertest";
// import jwt from "jsonwebtoken";
// import { JWT_SECRET } from "../../server";
import app from "../../app"; // Adjust path to your Express app
import {
  getAllProductsService,
  getProductByIdService,
  addProductService,
  updateProductService,
  deleteProductService,
  getProductRatingsService,
  getNewArrivalsService,
} from "../../services/productService";

const defaultImageURL =
  "https://shop.songprinting.com/global/images/PublicShop/ProductSearch/prodgr_default_300.png";
// Mock the service
jest.mock("../../services/productService");

describe("Product Endpoints", () => {
  const mockProducts = {
    products: [
      {
        id: "123",
        name: "Product 1",
        description: "Description for Product 1",
        longDescription: "Description for Product 1 long",
        price: 100.0,
        stockQuantity: 45,
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
        longDescription: "Description for Product 2 long",
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
    ],
    pagination: {
      currentPage: 1,
      totalProducts: 10,
      totalPages: 1,
    },
  };

  //   const mockToken = jwt.sign(
  //     { id: "123", role: "Admin" }, // Mock payload
  //     JWT_SECRET, // Use your app's JWT secret
  //     { expiresIn: "1h" } // Token expiration
  //   );

  const mockProduct = mockProducts.products[0];
  const mockRatings = [
    { id: "1", productId: "123", rating: 5, comment: "Excellent product!" },
    { id: "2", productId: "123", rating: 4, comment: "Very good!" },
  ];
  const mockNewArrivals = {
    products: [mockProducts.products[1]],
    pagination: {
      currentPage: 1,
      totalProducts: 1,
      totalPages: 1,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/products", () => {
    it("should return a list of products with status 201", async () => {
      (getAllProductsService as jest.Mock).mockResolvedValue(mockProducts);

      const response = await request(app).get("/api/products");

      // console.log(response);

      expect(response.status).toBe(201);
      expect(response.body.data).toHaveLength(2);
      expect(getAllProductsService).toHaveBeenCalledTimes(1);
    });
  });
});
