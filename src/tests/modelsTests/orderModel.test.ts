import { Sequelize, DataTypes } from "sequelize";
import { MockUser } from "./mockDataHelper"; // MockUser from the helper file
import Coupon from "../../models/Coupon";
import User from "../../models/User"
import Order from "../../models/Order";
import sequelize from "./mockDataHelper";

// Mocl Coupon
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

describe("Order Model Test", () => {
    let user: any;
    let coupon: any;

    beforeAll(async () => {
        await sequelize.sync({ force: true });
            // Create a mock user
        user = await MockUser.create({
            email: "testuser@example.com",
            first: "John",
            last: "Doe",
            passwordHash: "hashedPassword123",
        } as User);

        // Create a mock coupon
        coupon = await MockCoupon.create({
            code: "DEFAULTCOUPON",
            discountValue: 5.0,
        } as Coupon);

    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create an order successfully", async () => {
        const order = await MockOrder.create({
        userId: user.id,
        couponId: coupon.id,
        status: "processing",
        } as Order);

        // checking if the expected values are as expected
        expect(order).toBeDefined();
        expect(order.userId).toBe(user.id);
        expect(order.couponId).toBe(coupon.id);
        expect(order.status).toBe("processing");
    });

    it("should throw an error when userId is missing", async () => {
    await expect(
        MockOrder.create({
            couponId: coupon.id,
            status: "processing",
        } as Order)
        ).rejects.toThrowError("notNull Violation");
    });

    it("should throw an error when couponId is missing", async () => {
    await expect(
        MockOrder.create({
            userId: user.id,
            status: "processing",
        }as Order)
        ).rejects.toThrowError("notNull Violation");
    });
});
