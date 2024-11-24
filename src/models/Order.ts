import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/mySQLConf";
import User from "./User";

interface OrderAttributes {
  id: string;
  user_id: string;
  status: string;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, "id"> {}

class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: string;
  public user_id!: string;
  public status!: string;
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
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
