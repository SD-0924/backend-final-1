import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/mySQLConf';

interface OrderAttributes {
    id: number;
    user_id: number;
    status: string;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
    public id!: number;
    public user_id!: number;
    public status!: string;
}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'orders',
        modelName: 'Order',
    }
);

export default Order;
