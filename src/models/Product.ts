import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/mySQLConf'; 
import Brand from './Brand';
import Category from './Category';

interface ProductAttributes {
    id: string;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    isLimitedEdition: boolean;
    isFeatured: boolean;
    brandId: string;   
    categoryId: string;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    public id!: string;
    public name!: string;
    public description!: string;
    public price!: number;
    public stockQuantity!: number;
    public isLimitedEdition!: boolean;
    public isFeatured!: boolean;
    public brandId!: string;
    public categoryId!: string;
}

Product.init(
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
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        stockQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isLimitedEdition: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isFeatured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        brandId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Brand,
                key: 'id',
            },
        },
        categoryId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Category,
                key: 'id',
            },
        },
    },{
        sequelize,
        tableName: 'products',
        modelName: 'Product',
    }
);

export default Product;













