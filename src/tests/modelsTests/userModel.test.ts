import { Sequelize, DataTypes } from "sequelize";
import User from "../../models/User";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:", // In-memory database for tests
    define: {
        freezeTableName: true,
    },
});

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

describe("User Model Test", () => {

    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a new user successfully", async () => {
        const user = await MockUser.create({
            email: "testuser@example.com",
            first: "Test",
            last: "User",
            passwordHash: "hashedPassword123",
            mobileNum: "1234567890",
            address: "123 Test St, Test City",
            role: "Admin",
        });

        expect(user.email).toBe("testuser@example.com");
        expect(user.first).toBe("Test");
        expect(user.last).toBe("User");
        expect(user.passwordHash).toBe("hashedPassword123");
        expect(user.mobileNum).toBe("1234567890");
        expect(user.address).toBe("123 Test St, Test City");
        expect(user.role).toBe("Admin");
        expect(user.id).toBeDefined(); // ID was auto-generated
    });

    it("should not create a user without an email", async () => {
        await expect(
            MockUser.create({
                first: "Test",
                last: "User",
                passwordHash: "hashedPassword123",
            } as User)
        ).rejects.toThrowError("notNull Violation: User.email cannot be null");
    });

    it("should not create a user without a first name", async () => {
    await expect(
        MockUser.create({
            email: "testuser@example.com",
            last: "User",
            passwordHash: "hashedPassword123",
        }as User)
        ).rejects.toThrowError("notNull Violation: User.first cannot be null");
    });
});