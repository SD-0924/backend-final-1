import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/mySQLConf';

interface UserAttributes {
    id: number;
    email: string;
    first: string | null;
    last: string | null;
    password_hash: string;
    mobile_num: string | null;
    address: string | null;
    role: string | null;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'first' | 'last' | 'mobile_num' | 'address' | 'role'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public first!: string | null;
    public last!: string | null;
    public password_hash!: string;
    public mobile_num!: string | null;
    public address!: string | null;
    public role!: string | null;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        first: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        last: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mobile_num: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'users',
        modelName: 'User',
    }
);

export default User;
