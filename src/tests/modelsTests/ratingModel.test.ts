import { Sequelize, DataTypes } from "sequelize";
import Rating from "../../models/Rating"; 
import Product from "../../models/Product";
import User from "../../models/User";
import Brand from "../../models/Brand"; 
import Category from "../../models/Category"; 

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

// Product Model
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

// User Model
const MockUser = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        first: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mobileNum: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "User",
        },
    },
    {
        tableName: "users",
    }
) as typeof User;

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