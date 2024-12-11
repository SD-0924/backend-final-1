import { Sequelize, DataTypes } from "sequelize";
import Category from "../../models/Category";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    define: {
        freezeTableName: true,
    },
});

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

describe("Category Model Test", () => {

    // initializing the in-memory database and sync the model
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    // closing the DB connection
    afterAll(async () => {
        await sequelize.close();
    });

    // creating category
    it("should create a category with valid attributes", async () => {
        const category = await MockCategory.create({
            name: "Electronics",
            description: "Devices, gadgets, and accessories.",
        } as Category);

        expect(category.name).toBe("Electronics");
        expect(category.description).toBe("Devices, gadgets, and accessories.");
        expect(category).toBeDefined();
    });

    // not able to create a category due to missing the name
    it("should throw an error if creating a category without a name", async () => {
        await expect(
            MockCategory.create({
                description: "This will fail due to missing name.",
            } as Category)
        ).rejects.toThrow("notNull Violation: Category.name cannot be null");
    });

    // creating category with the name only - description is optional in Category model
    it("should allow creating a category without a description", async () => {
        const category = await MockCategory.create({
            name: "Books",
        } as Category);

        expect(category).toBeDefined();
        expect(category.name).toBe("Books");
    });
});