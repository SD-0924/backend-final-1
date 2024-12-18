import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/mySQLConf";
import Brand from "./Brand";
import Category from "./Category";

interface ProductAttributes {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  stockQuantity: number;
  isLimitedEdition: boolean;
  isFeatured: boolean;
  brandId: string;
  categoryId: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: string;
  public name!: string;
  public description!: string;
  public longDescription!: string;
  public price!: number;
  public stockQuantity!: number;
  public isLimitedEdition!: boolean;
  public isFeatured!: boolean;
  public brandId!: string;
  public categoryId!: string;
  public imageUrl!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Product.init(
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
    sequelize,
    tableName: "products",
    modelName: "Product",
  }
);

// Add hooks to update isLimitedEdition based on stockQuantity
Product.addHook("beforeCreate", (product) => {
  const productInstance = product as Product; // Cast to the Product type
  productInstance.isLimitedEdition = productInstance.stockQuantity < 20;
});

Product.addHook("beforeUpdate", (product) => {
  const productInstance = product as Product; // Cast to the Product type
  productInstance.isLimitedEdition = productInstance.stockQuantity < 20;
});

export default Product;
