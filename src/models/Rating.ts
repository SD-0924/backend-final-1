import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/mySQLConf'; 
import Product from './Product';
import User from './User';

interface RatingAttributes {
    id: string;
    productId: string;
    userId: string;
    ratingValue: number;
    review?: string;
}

interface RatingCreationAttributes extends Optional<RatingAttributes, 'id' | 'review'> {}

class Rating extends Model<RatingAttributes, RatingCreationAttributes> implements RatingAttributes {
    public id!: string;
    public productId!: string;
    public userId!: string;
    public ratingValue!: number;
    public review?: string;
}

Rating.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        productId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Product,
                key: 'id',
            },
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        ratingValue: {
            type: DataTypes.DECIMAL(2, 1),
            allowNull: false,
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'ratings',
        modelName: 'Rating',
        timestamps: true,
    }
);

export default Rating;