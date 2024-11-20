import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/mySQLConf';

interface OrderItemAttributes {
    id: number;
    order_id: number;
    product_id: number;
    price: number;
    quantity: number;
}

interface OrderItemCreationAttributes extends Optional<OrderItemAttributes, 'id'> {}

class OrderItem extends Model<OrderItemAttributes, OrderItemCreationAttributes> implements OrderItemAttributes {
    public id!: number;
    public order_id!: number;
    public product_id!: number;
    public price!: number;
    public quantity!: number;
}

OrderItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        tableName: 'order_items',
        modelName: 'OrderItem',
    }
);

export default OrderItem;
