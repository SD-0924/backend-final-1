import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/mySQLConf'; 

interface BrandAttributes {
    id: string;
    name: string;
    logo: string;
}

interface BrandCreationAttributes extends Optional<BrandAttributes, 'id'> {}

class Brand extends Model<BrandAttributes, BrandCreationAttributes> implements BrandAttributes {
    public id!: string;
    public name!: string;
    public logo!: string;
}

Brand.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'brands',
        modelName: 'Brand',
    }
);

export default Brand;