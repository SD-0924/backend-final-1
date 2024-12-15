import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/mySQLConf";

interface UserAttributes {
  id: string;
  email: string;
  first: string | null;
  last: string | null;
  passwordHash: string;
  mobileNum: string | null;
  address: string | null;
  role: string | null;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public first!: string | null;
  public last!: string | null;
  public passwordHash!: string;
  public mobileNum!: string | null;
  public address!: string | null;
  public role!: string | null;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobileNum: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "User",
    },
  },
  {
    sequelize,
    tableName: "users",
    modelName: "User",
    timestamps: true,
  }
);

export default User;
