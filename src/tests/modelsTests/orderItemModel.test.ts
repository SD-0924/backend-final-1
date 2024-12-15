import { Sequelize, DataTypes } from "sequelize";
import Product from "../../models/Product";
import Brand from "../../models/Brand"; 
import Category from "../../models/Category"; 
import Order from "../../models/Order";
import User from "../../models/User";
import Coupon from "../../models/Coupon";
import OrderItem from "../../models/OrderItem";
import { MockBrand, MockCategory, MockProduct, MockUser} from "./mockDataHelper";
import sequelize from "./mockDataHelper";

const MockCoupon = sequelize.define(
    "Coupon",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        discountType: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "amount",
        },
        discountValue: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        minOrderValue: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        usageLimit: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
        },
        expiryDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        tableName: "coupons",
    }
) as typeof Coupon;

// Mock Order
const MockOrder = sequelize.define(
    "Order",
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
        couponId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Coupon,
                key: "id",
            },
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "orders",
    }

) as typeof Order;

// Mock OrderItem
const MockOrderItem = sequelize.define(
    "OrderItem",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        orderId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Order,
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
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "orderItems",
    }
) as typeof OrderItem;

describe("OrderItem Model", () => {

    let product: Product;
    let order: Order;

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
        // Mock User
        const user = await MockUser.create({
            email: "testuser@example.com",
            first: "Test",
            last: "User",
            passwordHash: "hashedPassword123",
        } as User);

        const coupon = await MockCoupon.create({
            code: "DEFAULTCOUPON",
            discountValue: 5.0,
        } as Coupon);

        order = await MockOrder.create({
            userId: user.id,
            couponId: coupon.id,
            status: "processing",
        } as Order);
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create an OrderItem successfully", async () => {

        const orderItem = await MockOrderItem.create({
            orderId: order.id,
            productId: product.id,
            price: 99.9,
            quantity: 2,
        } as OrderItem);
        
        expect(orderItem.orderId).toBe(order.id);
        expect(orderItem.productId).toBe(product.id);
        expect(orderItem.price).toBe(99.9);
        expect(orderItem.quantity).toBe(2);

    });
});


