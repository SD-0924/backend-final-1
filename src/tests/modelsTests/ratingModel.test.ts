import { Sequelize, DataTypes } from "sequelize";
import Rating from "../../models/Rating"; 
import Product from "../../models/Product";
import User from "../../models/User";
import Brand from "../../models/Brand"; 
import Category from "../../models/Category"; 
import { MockBrand, MockCategory, MockProduct, MockUser} from "./mockDataHelper";
import sequelize from "./mockDataHelper";

// Rating Model
const MockRating = sequelize.define(
    "Rating",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        productId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Product,
                key: "id",
            },
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
        ratingValue: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: "ratings",
    }
) as typeof Rating;

describe("Rating Model Test", () => {

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

    it("should create a rating for a product", async () => {

        // creating a ratign for a product by user 
        const rating = await MockRating.create({
            productId: product.id,
            userId: user.id,
            ratingValue: 4.5,
            review: "Great product!",
        } as Rating);

        // checking if the rating was created successfully
        expect(rating.ratingValue).toBe(4.5);
        expect(rating.review).toBe("Great product!");
        expect(rating.productId).toBe(product.id);
        expect(rating.userId).toBe(user.id);
    });
});