import request from "supertest";
const SequelizeMock = require("sequelize-mock");
import app from "../../app";
import * as productService from "../../services/productService"; // Mocking services
const DBConnectionMock = new SequelizeMock();

jest.mock("../../services/productService"); // Mock the service layer

const ProductMock1 = DBConnectionMock.define("Product", {
  id: "1",
  name: "Product 1",
  description: "A detailed description of Product 1",
  price: 100.0,
  stockQuantity: 50,
  isLimitedEdition: false,
  isFeatured: true,
  brandId: "brand-1",
  categoryId: "category-1",
  createdAt: new Date("2024-11-01T00:00:00.000Z"),
  updatedAt: new Date("2024-11-10T00:00:00.000Z"),
});

const ProductMock2 = DBConnectionMock.define("Product", {
  id: "2",
  name: "Product 2",
  description: "A detailed description of Product 2",
  price: 200.0,
  stockQuantity: 30,
  isLimitedEdition: true,
  isFeatured: false,
  brandId: "brand-2",
  categoryId: "category-2",
  createdAt: new Date("2024-11-02T00:00:00.000Z"),
  updatedAt: new Date("2024-11-10T00:00:00.000Z"),
});

describe("Products Endpoints", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe("GET /api/products", () => {
    it("should return a list of products", async () => {
      jest
        .spyOn(productService, "getAllProductsService")
        .mockResolvedValue([ProductMock1, ProductMock2]);

      const res = await request(app).get("/api/products");

      expect(res.status).toBe(200);
      expect(res.body).toEqual([ProductMock1, ProductMock2]);
      expect(res.body[0]).toHaveProperty("id", "1");
      expect(res.body[0]).toHaveProperty("name", "Product 1");
      expect(res.body[0]).toHaveProperty(
        "description",
        "A detailed description of Product 1"
      );
      expect(res.body[0]).toHaveProperty("price", 100.0);
      expect(res.body[0]).toHaveProperty("stockQuantity", 50);
      expect(res.body[0]).toHaveProperty("isLimitedEdition", false);
      expect(res.body[0]).toHaveProperty("isFeatured", true);
      expect(res.body[0]).toHaveProperty("brandId", "brand-1");
      expect(res.body[0]).toHaveProperty("categoryId", "category-1");
      expect(res.body[0]).toHaveProperty(
        "createdAt",
        "2024-11-01T00:00:00.000Z"
      );
      expect(res.body[0]).toHaveProperty(
        "updatedAt",
        "2024-11-10T00:00:00.000Z"
      );
    });

    it("should return a 500 error if the service fails", async () => {
      jest
        .spyOn(productService, "getAllProductsService")
        .mockRejectedValue(new Error("Service error"));

      const res = await request(app).get("/api/products");

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Failed to fetch products");
    });
  });

  describe("GET /api/products/:id", () => {
    it("should return a product by ID", async () => {
      jest
        .spyOn(productService, "getProductByIdService")
        .mockResolvedValue(ProductMock1);

      const res = await request(app).get("/api/products/1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(ProductMock1);
    });

    it("should return a 404 error if the product is not found", async () => {
      jest
        .spyOn(productService, "getProductByIdService")
        .mockResolvedValue(null);

      const res = await request(app).get("/api/products/1");

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error", "Product not found");
    });

    it("should return a 500 error if the service fails", async () => {
      jest
        .spyOn(productService, "getProductByIdService")
        .mockRejectedValue(new Error("Service error"));

      const res = await request(app).get("/api/products/1");

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Failed to fetch product");
    });
  });

  describe("POST /api/products", () => {
    it("should create a new product", async () => {
      jest
        .spyOn(productService, "addProductService")
        .mockResolvedValue(ProductMock1);

      const res = await request(app)
        .post("/api/products")
        .send({ name: "New Product", price: 150 });

      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        success: true,
        message: "Product added successfully!",
        data: ProductMock1,
      });
    });

    it("should return a 500 error if the service fails", async () => {
      jest
        .spyOn(productService, "addProductService")
        .mockRejectedValue(new Error("Service error"));

      const res = await request(app)
        .post("/api/products")
        .send({ name: "New Product", price: 150 });

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty(
        "message",
        "Failed to add product. Please try again later."
      );
    });
  });

  describe("PUT /api/products/:id", () => {
    it("should update a product", async () => {
      const mockUpdatedProduct = {
        id: "1",
        name: "Updated Product",
        price: 200,
      };
      jest
        .spyOn(productService, "updateProductService")
        .mockResolvedValue(mockUpdatedProduct);

      const res = await request(app)
        .put("/api/products/1")
        .send({ name: "Updated Product", price: 200 });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        success: true,
        message: "Product updated successfully!",
        data: mockUpdatedProduct,
      });
    });

    it("should return a 500 error if the service fails", async () => {
      jest
        .spyOn(productService, "updateProductService")
        .mockRejectedValue(new Error("Service error"));

      const res = await request(app)
        .put("/api/products/1")
        .send({ name: "Updated Product", price: 200 });

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty(
        "message",
        "Failed to update product. Please try again later."
      );
    });
  });

  describe("DELETE /api/products/:id", () => {
    it("should delete a product", async () => {
      jest.spyOn(productService, "deleteProductService").mockResolvedValue();

      const res = await request(app).delete("/api/products/1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        success: true,
        message: "Product deleted successfully!",
      });
    });

    it("should return a 500 error if the service fails", async () => {
      jest
        .spyOn(productService, "deleteProductService")
        .mockRejectedValue(new Error("Service error"));

      const res = await request(app).delete("/api/products/1");

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty(
        "message",
        "Failed to delete product. Please try again later."
      );
    });
  });

  describe("GET /api/products/:id/ratings", () => {
    it("should return product ratings", async () => {
      const mockRatings = [{ rating: 5 }, { rating: 4 }];
      jest
        .spyOn(productService, "getProductRatingsService")
        .mockResolvedValue(mockRatings);

      const res = await request(app).get("/api/products/1/ratings");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockRatings);
    });

    it("should return a 500 error if the service fails", async () => {
      jest
        .spyOn(productService, "getProductRatingsService")
        .mockRejectedValue(new Error("Service error"));

      const res = await request(app).get("/api/products/1/ratings");

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Failed to fetch ratings");
    });
  });
});
