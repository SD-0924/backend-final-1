import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/mySQLConf'; 
import Product from './Product';

interface DiscountAttributes {
    id: string;
    discountPercentage: number;
    productId: string;
    startDate: Date;
    endDate: Date;
}

interface DiscountCreationAttributes extends Optional<DiscountAttributes, 'id'> {}

class Discount extends Model<DiscountAttributes, DiscountCreationAttributes> implements DiscountAttributes {
    public id!: string;
    public discountPercentage!: number;
    public productId!: string;
    public startDate!: Date;
    public endDate!: Date;
}

Discount.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        discountPercentage: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productId:{
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Product,
                key: 'id',
            },
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'discounts',
        modelName: 'Discount',
        timestamps: false,
    }
);

export default Discount;
