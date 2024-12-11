import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/mySQLConf";
import Product from "./Product";
import User from "./User";

interface CartItemAttributes {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
}

interface CartItemCreationAttributes extends Optional<CartItemAttributes, "id"> {}

class CartItem extends Model<CartItemAttributes, CartItemCreationAttributes> implements CartItemAttributes
{
  public id!: string;
  public userId!: string;
  public productId!: string;
  public quantity!: number;
}

CartItem.init(
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
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "cartItems",
    modelName: "CartItem",
  }
);

export default CartItem;
