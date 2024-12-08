import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/mySQLConf";
import User from "./User";
import Coupon from "./Coupon";

interface OrderAttributes {
  id: string;
  userId: string;
  couponId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, "id"> {}

class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: string;
  public userId!: string;
  public couponId!: string;
  public status!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Order.init(
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
    createdAt: {  // Explicitly define createdAt field
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Set to current timestamp by default
    },
    updatedAt: {  // Explicitly define updatedAt field
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Set to current timestamp by default
    },
  },
  {
    sequelize,
    tableName: "orders",
    modelName: "Order",
  }
);

export default Order;
