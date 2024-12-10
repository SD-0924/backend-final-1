import { Sequelize, DataTypes } from "sequelize";
import Discount from "../../models/Discount";
import Product from "../../models/Product"; 
import Brand from "../../models/Brand"; 
import Category from "../../models/Category"; 
import { BroadcastChannel } from "worker_threads";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    define: {
        freezeTableName: true,
    },
});

// Brand Model
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
) as typeof Brand;

// Category Model
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
) as typeof Category;

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
    }
) as typeof Product;

const MockDiscount = sequelize.define(
    "Discount",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        discountPercentage: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        productId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Product,
                key: "id",
            },
        },
    },
    {
        tableName: "discounts",
    }
) as typeof Discount;

describe("Discount Model Test", () => {

    let product: Product;

    beforeAll(async () => {
        await sequelize.sync({ force: true });

        // inserting mock Brand and Category
        const brand = await MockBrand.create({
            id: "a84c591a-6a2b-4800-997f-32d343094a",
            name: "Brand A",
            logo: "brand-image.png",
        } as Brand);

        const category = await MockCategory.create({
            id: "bc4fbd6e-37a1-403948e-86ba-695a56ee",
            name: "Category A",
        } as Category);

        // creating a mock product
        product = await MockProduct.create({
            name: "Product with Discount",
            description: "Product description",
            price: 99.99,
            stockQuantity: 10,
            isFeatured: true,
            brandId: brand.id,
            categoryId: category.id,
        } as Product);
        
        // adding beforeCreate hook for Product
        MockProduct.addHook("beforeCreate", (product) => {
            const productInstance = product as Product;
            productInstance.isLimitedEdition = productInstance.stockQuantity < 20;
        });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a discount for the product", async () => {

        // creating a discount for the product
        const discount = await MockDiscount.create({
            discountPercentage: 10,
            productId: product.id,
            startDate: new Date(),
            endDate: new Date(),
        } as Discount);

        // checking if the discount was created
        expect(discount.discountPercentage).toBe(10);
        expect(discount.productId).toBe(product.id);
    });
});