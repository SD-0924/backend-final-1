import { Sequelize, DataTypes } from "sequelize";
import Product from "../../models/Product"; 
import Brand from "../../models/Brand"; 
import Category from "../../models/Category"; 
import User from "../../models/User"; 

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    define: {
        freezeTableName: true,
    },
});

// Brand Model
export const MockBrand = sequelize.define(
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

export default sequelize;

// Category Model
export const MockCategory = sequelize.define(
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
export const MockProduct = sequelize.define(
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
export const MockUser = sequelize.define(
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
