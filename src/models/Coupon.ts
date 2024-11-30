import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/mySQLConf";

interface CouponAttributes {
  id: string;
  code: string;
  discountType: string;
  discountValue: number;
  minOrderValue: number | null;
  usageLimit: number | null;
  expiryDate: Date | null;
  isActive: boolean;
}

interface CouponCreationAttributes
  extends Optional<
    CouponAttributes,
    "id" | "minOrderValue" | "usageLimit" | "expiryDate"
  > {}

class Coupon
  extends Model<CouponAttributes, CouponCreationAttributes>
  implements CouponAttributes
{
  public id!: string;
  public code!: string;
  public discountType!: string;
  public discountValue!: number;
  public minOrderValue!: number | null;
  public usageLimit!: number | null;
  public expiryDate!: Date | null;
  public isActive!: boolean;
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
      unique: true,
    },
    discountType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "amount",
    },
    discountValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    minOrderValue: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    usageLimit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "coupons",
    modelName: "Coupon",
    timestamps: true,
  }
);

export default Coupon;
