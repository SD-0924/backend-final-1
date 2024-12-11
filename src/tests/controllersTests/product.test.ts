import request from "supertest";

import app from "../../app";
import {
  getAllProductsService,
  getProductByIdService,
  addProductService,
  updateProductService,
  getProductRatingsService,
  getNewArrivalsService,
  getProductsByBrandService,
  getProductsByCategoryService,
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

  const mockProductByBrand = {
    products: [mockProducts.products[0]],
    pagination: {
      currentPage: 1,
      totalProducts: 1,
      totalPages: 1,
    },
  };

  const mockProductByCategory = {
    products: [mockProducts.products[1]],
    pagination: {
      currentPage: 1,
      totalProducts: 1,
      totalPages: 1,
    },
  };

  const mockBrand = { id: "brand123", name: "Mock Brand", logo: "logo.png" };
  const mockCategory = {
    id: "category123",
    name: "Mock Category",
    description: "Mock Category Description",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/products/by-brand/:brandId", () => {
    it("should return products by brand with status 201", async () => {
      (getProductsByBrandService as jest.Mock).mockResolvedValue(
        mockProductByBrand
      );

      const brandId = "brand123";
      const response = await request(app).get(
        `/api/products/by-brand/${brandId}`
      );
      expect(response.status).toBe(201);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].id).toEqual(
        mockProductByBrand.products[0].id
      );
      expect(getProductsByBrandService).toHaveBeenCalledWith(brandId, 1, 10);
    });
  });

  describe("GET /api/products/by-category/:categoryId", () => {
    it("should return products by category with status 201", async () => {
      (getProductsByCategoryService as jest.Mock).mockResolvedValue(
        mockProductByCategory
      );

      const categoryId = "category456";
      const response = await request(app).get(
        `/api/products/by-category/${categoryId}`
      );

      expect(response.status).toBe(201);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].id).toEqual(
        mockProductByCategory.products[0].id
      );
      expect(getProductsByCategoryService).toHaveBeenCalledWith(
        categoryId,
        1,
        10
      );
    });
  });

  describe("GET /api/products", () => {
    it("should return a list of products with status 201", async () => {
      (getAllProductsService as jest.Mock).mockResolvedValue(mockProducts);

      const response = await request(app).get("/api/products");

      expect(response.status).toBe(201);
      expect(response.body.data).toHaveLength(2);
      expect(getAllProductsService).toHaveBeenCalledTimes(1);
    });
  });

  describe("GET /api/products/:id", () => {
    it("should return a product by ID with status 201", async () => {
      (getProductByIdService as jest.Mock).mockResolvedValue(mockProduct);

      const response = await request(app).get(
        `/api/products/${mockProduct.id}`
      );

      expect(response.status).toBe(201);
      expect(response.body.name).toBe(mockProduct.name);
      expect(getProductByIdService).toHaveBeenCalledWith(mockProduct.id);
    });

    it("should return 404 if product is not found", async () => {
      (getProductByIdService as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get("/api/products/unknown");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Product not found" });
    });
  });

  describe("POST /api/products", () => {
    it("should add a product and return it with status 201", async () => {
      (addProductService as jest.Mock).mockResolvedValue({
        ...mockProduct,
        createdAt: mockProduct.createdAt.toDateString(),
        updatedAt: mockProduct.updatedAt.toDateString(),
      });

      const response = await request(app)
        .post("/api/products")
        .send({
          ...mockProduct,
          createdAt: mockProduct.createdAt.toDateString(),
          updatedAt: mockProduct.updatedAt.toDateString(),
        });

      expect(response.status).toBe(201);
      expect(response.body.data.name).toBe(mockProduct.name);
      expect(addProductService).toHaveBeenCalledWith({
        ...mockProduct,
        createdAt: mockProduct.createdAt.toDateString(),
        updatedAt: mockProduct.updatedAt.toDateString(),
      });
    });

    it("should return 400 for validation errors", async () => {
      const response = await request(app).post("/api/products").send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "Validation error");
    });
  });

  describe("PUT /products/:id", () => {
    it("should update a product and return it with status 200", async () => {
      (updateProductService as jest.Mock).mockResolvedValue(mockProduct);

      const response = await request(app)
        .put(`/api/products/${mockProduct.id}`)
        .send({ name: "Updated Product" });

      expect(response.status).toBe(200);
      expect(response.body.data.name).toBe(mockProduct.name);
      expect(updateProductService).toHaveBeenCalledWith(mockProduct.id, {
        name: "Updated Product",
        imageUrl: defaultImageURL,
      });
    });
  });

  describe("GET /api/products/new-arrivals", () => {
    it("should return new arrivals with pagination details", async () => {
      (getNewArrivalsService as jest.Mock).mockResolvedValue(mockNewArrivals);

      const response = await request(app).get(
        "/api/products/new-arrivals?page=1&limit=10"
      );

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.pagination.currentPage).toBe(1);
      expect(getNewArrivalsService).toHaveBeenCalledWith(1, 10);
    });
  });

  describe("GET /api/products/:id/ratings", () => {
    it("should return ratings for a product with status 201", async () => {
      (getProductRatingsService as jest.Mock).mockResolvedValue(mockRatings);

      const response = await request(app).get(
        `/api/products/${mockProduct.id}/ratings`
      );

      expect(response.status).toBe(201);
      expect(response.body).toHaveLength(2);
      expect(response.body[1].comment).toEqual(mockRatings[1].comment);

      expect(getProductRatingsService).toHaveBeenCalledWith(mockProduct.id);
    });
  });
});
