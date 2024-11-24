import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/mySQLConf";
import Product from "./Product";
import Order from "./Order";

interface OrderItemAttributes {
  id: string;
  order_id: string;
  product_id: string;
  price: number;
  quantity: number;
}

interface OrderItemCreationAttributes
  extends Optional<OrderItemAttributes, "id"> {}

class OrderItem
  extends Model<OrderItemAttributes, OrderItemCreationAttributes>
  implements OrderItemAttributes
{
  public id!: string;
  public order_id!: string;
  public product_id!: string;
  public price!: number;
  public quantity!: number;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Order,
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "order_items",
    modelName: "OrderItem",
  }
);

export default OrderItem;
