import { Sequelize, DataTypes } from "sequelize";
import Product from "../../models/Product";
import User from "../../models/User";
import Brand from "../../models/Brand"; 
import Category from "../../models/Category"; 
import { MockBrand, MockCategory, MockProduct} from "./mockDataHelper";
import sequelize from "./mockDataHelper";

describe("Product Model Test", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });

    // Insert mock Brand and Category
    await MockBrand.create({
      id: "a84c591a-6a2b-4800-997f-32d343094a",
      name: "Brand A",
      logo: "brand-image.png",
    } as Brand);
    await MockCategory.create({
      id: "bc4fbd6e-37a1-403948e-86ba-695a56ee",
      name: "Category A",
    } as Category);

    MockProduct.addHook("beforeCreate", (product) => {
      const productInstance = product as Product; // Cast to the Product type
      productInstance.isLimitedEdition = productInstance.stockQuantity < 20;
    });
  });
  
  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a new product", async () => {
    const product = await MockProduct.create({
      name: "New Product discount",
      description: "This is a sample product.",
      price: 99.99,
      stockQuantity: 5,
      isFeatured: true,
      brandId: "a84c591a-6a2b-4800-997f-32d343094a",
      categoryId: "bc4fbd6e-37a1-403948e-86ba-695a56ee",
    } as Product);
    expect(product.name).toBe("New Product discount");
    expect(product.isLimitedEdition).toBe(true);
  });
});
