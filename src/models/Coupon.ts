import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/mySQLConf';

interface CouponAttributes {
    id: string;
    code: string;
    discount_type: string;
    discount_value: number;
    min_order_value: number | null;
    usage_limit: number | null;
    expiry_date: Date | null;
    is_active: boolean;
}

interface CouponCreationAttributes extends Optional<CouponAttributes, 'id' | 'min_order_value' | 'usage_limit' | 'expiry_date'> {}

class Coupon extends Model<CouponAttributes, CouponCreationAttributes> implements CouponAttributes {
    public id!: string;
    public code!: string;
    public discount_type!: string;
    public discount_value!: number;
    public min_order_value!: number | null;
    public usage_limit!: number | null;
    public expiry_date!: Date | null;
    public is_active!: boolean;
}

Coupon.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        discount_type: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "amount"
        },
        discount_value: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        min_order_value: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        usage_limit: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue:1
        },
        expiry_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        sequelize,
        tableName: 'coupons',
        modelName: 'Coupon',
        timestamps: true
    }
);

export default Coupon;
