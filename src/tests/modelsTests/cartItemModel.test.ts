import { Sequelize, DataTypes } from "sequelize";
import Product from "../../models/Product";
import Brand from "../../models/Brand"; 
import Category from "../../models/Category";
import User from "../../models/User";
import CartItem from "../../models/CartItem";
import { MockBrand, MockCategory, MockProduct, MockUser} from "./mockDataHelper";
import sequelize from "./mockDataHelper";

// Mock CartItem
const MockCartItem = sequelize.define(
    "CartItem",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
        productId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Product,
                key: "id",
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "cartItems",
    }
) as typeof CartItem;

describe("CartItem Model Test", () => {

    let product: Product;
    let user: User;

    beforeAll(async () => {

        await sequelize.sync({ force: true });

        // Creating Brand
        const brand = await MockBrand.create({
            name: "Test Brand",
            logo: "test-logo.png",
        } as Brand);
        
        // Mock Category
        const category = await MockCategory.create({
            name: "Test Category",
            description: "A sample category for testing.",
        } as Category);

        // Mock Product
        product = await MockProduct.create({
            name: "Product with Discount",
            description: "Product description",
            price: 99.99,
            stockQuantity: 10,
            isFeatured: true,
            brandId: brand.id,
            categoryId: category.id,
        } as Product);

        MockProduct.addHook("beforeCreate", (product) => {
            const productInstance = product as Product;
            productInstance.isLimitedEdition = productInstance.stockQuantity < 20;
        });

        // Mock User
        user = await MockUser.create({
            email: "testuser@example.com",
            first: "Test",
            last: "User",
            passwordHash: "hashedPassword123",
        } as User);
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a valid cart item", async () => {
        
        const cartItem = await MockCartItem.create({
            userId: user.id,
            productId: product.id,
            quantity: 2,
        } as CartItem);

        // Validate the cart item
        expect(cartItem).toBeDefined();
        expect(cartItem.userId).toBe(user.id);
        expect(cartItem.productId).toBe(product.id);
        expect(cartItem.quantity).toBe(2);
    });
});