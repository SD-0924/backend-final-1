import { Sequelize, DataTypes } from "sequelize";
import Coupon from "../../models/Coupon";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    define: {
        freezeTableName: true,
    },
});

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

describe("Coupon Model Test", () => {

    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a new coupon successfully", async () => {
        const coupon = await MockCoupon.create({
            code: "DISCOUNT10",
            discountType: "amount",
            discountValue: 10.0,
            minOrderValue: 50.0,
            usageLimit: 5,
            expiryDate: new Date("2024-12-31"),
            isActive: true,
        } as Coupon);

        expect(coupon.code).toBe("DISCOUNT10");
        expect(coupon.discountType).toBe("amount");
        expect(coupon.discountValue).toBe(10.0);
        expect(coupon.minOrderValue).toBe(50.0);
        expect(coupon.usageLimit).toBe(5);
        expect(coupon.expiryDate).toEqual(new Date("2024-12-31"));
        expect(coupon.isActive).toBe(true);
        expect(coupon.id).toBeDefined(); // ID was auto-generated
    });

    it("should not create a coupon without a code", async () => {
    await expect(
        MockCoupon.create({
            discountValue: 10.0,
        } as Coupon)
        ).rejects.toThrowError("notNull Violation: Coupon.code cannot be null");
    });

    it("should not create a coupon without a discountValue", async () => {
    await expect(
        MockCoupon.create({
            code: "DISCOUNT10",
        } as Coupon)
        ).rejects.toThrowError("notNull Violation: Coupon.discountValue cannot be null");
    });

    it("should apply default values for optional fields", async () => {
        const coupon = await MockCoupon.create({
            code: "DEFAULTCOUPON",
            discountValue: 5.0,
        } as Coupon);

        expect(coupon.discountType).toBe("amount"); // Default value
        expect(coupon.usageLimit).toBe(1); // Default value
        expect(coupon.isActive).toBe(true); // Default value
    });
});

