import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/mySQLConf";
import User from "./User";
import Coupon from "./Coupon";

interface OrderAttributes {
  id: string;
  userId: string;
  couponId: string;
  status: string;
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
      allowNull: true,
      references: {
        model: Coupon,
        key: "id",
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "orders",
    modelName: "Order",
  }
);

export default Order;
