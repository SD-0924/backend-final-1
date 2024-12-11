import { Sequelize, DataTypes } from "sequelize";
import Brand from "../../models/Brand";

// creating a new in-memory SQLite database for testing
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    define: {
        freezeTableName: true,
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
            allowNull: false, // Required field
        },
    },
    {
        tableName: "brands",
    }
) as typeof Brand;

describe("Brand Model Test", () => {

    // initializing the in-memory database and sync the model
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    // closing the DB connection
    afterAll(async () => {
        await sequelize.close();
    });

    // create a brand test - have to be succeed
    it("should create a new brand successfully", async () => {
    // creating a brand instance
    const brand = await MockBrand.create({
        name: "Test Brand",
        logo: "test-logo.png",
    } as Brand);

    expect(brand.name).toBe("Test Brand");
    expect(brand.logo).toBe("test-logo.png");
    expect(brand.id).toBeDefined(); //  ID was auto-generated
    });

    it("should not create a brand without a name", async () => {
        // create a brand without a name test
        await expect(
            MockBrand.create({
                logo: "test-logo.png",
            } as Brand)
        ).rejects.toThrowError("notNull Violation: Brand.name cannot be null");
    });

    it("should not create a brand without a logo", async () => {
    // create a brand without a logo test
        await expect(
        MockBrand.create({
            name: "Brand Without Logo",
        } as Brand)
        ).rejects.toThrowError("notNull Violation: Brand.logo cannot be null");
    });
});