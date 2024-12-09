import { Sequelize, DataTypes } from "sequelize";
import Product from "../../models/Product";
import Brand from "../../models/Brand";
import Category from "../../models/Category";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  define: {
    freezeTableName: true, // Prevent Sequelize from pluralizing table names
  },
});

const MockBrand = sequelize.define(
  "Brand",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "brands",
  }
);

const MockCategory = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "categories",
  }
);

const MockProduct = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isLimitedEdition: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    brandId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Brand,
        key: "id",
      },
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Category,
        key: "id",
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    longDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "products",
    modelName: "Product",
  }
) as typeof Product;

describe("Product Model Test", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });

    // Insert mock Brand and Category
    await MockBrand.create({
      id: "a84c591a-6a2b-4800-997f-32d343094a",
      name: "Brand A",
      logo: "brand-image.png",
    });
    await MockCategory.create({
      id: "bc4fbd6e-37a1-403948e-86ba-695a56ee",
      name: "Category A",
    });

    MockProduct.addHook("beforeCreate", (product) => {
      console.log(product);
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
