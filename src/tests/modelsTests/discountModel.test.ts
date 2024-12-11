import { Sequelize, DataTypes } from "sequelize";
import Discount from "../../models/Discount";
import Product from "../../models/Product";
import Brand from "../../models/Brand"; 
import Category from "../../models/Category"; 
import { MockBrand, MockCategory, MockProduct} from "./mockDataHelper";
import sequelize from "./mockDataHelper";

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