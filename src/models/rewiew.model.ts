import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import {Order} from "./order.model";

export interface ReviewAttributes {
    id: number;
    user_id: number;
    rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
}

export interface ReviewCreationAttributes extends Optional<ReviewAttributes, 'id'> {}

export class Review extends Model<ReviewAttributes, ReviewCreationAttributes> {
    id!: number; // додаємо знак "!" для інформування TypeScript, що значення буде задано поза конструктором
    user_id!: number;
    rating!: number;
    comment!: string;
    created_at!: string;
    updated_at!: string;
}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING(500), // обмежуємо довжину коментаря
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'reviews',
        modelName: 'Review',
        timestamps: true,
        underscored: true,
    }
);
Order.hasMany(Review, { foreignKey: 'order_id' });
Review.belongsTo(Order, { foreignKey: 'order_id' });
export default Review;
