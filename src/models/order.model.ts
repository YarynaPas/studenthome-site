import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { StatusEnum } from '../enum/status-enum';
import { PaymentStatusEnum } from '../enum/payment-status-enum';
import { Discipline } from './discipline.model';
import { Subject } from './subject.model';
import { OrdersTypesEnum } from '../enum/orders-type-enum';
import { User } from './user.model';

export interface OrderAttributes {
    id: number;
    user_id: number;
    discipline_id: number;
    subject_id: number;
    discipline_name?: string; // Може бути тільки віртуальним
    subject_name: string;
    application_date: Date;
    cost: number;
    deadline: Date | null;
    submission_date: Date | null;
    comment: string | null;
    author_name: string;
    status: StatusEnum;
    topic: string;
    number_of_pages: number;
    payment_status: PaymentStatusEnum;
    type: OrdersTypesEnum;
    social_media: string | null;
    file_path: string | null;
}

export interface OrderCreationAttributes extends Optional<OrderAttributes, 'id' | 'application_date' | 'cost' | 'submission_date' | 'comment' | 'author_name' | 'status' | 'payment_status' | 'file_path'> {}

export class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
    id!: number;
    user_id!: number;
    discipline_id!: number;
    subject_id!: number;
    discipline_name?: string; // Не обов'язково, тільки віртуальне поле
    subject_name!: string;
    application_date!: Date;
    cost!: number;
    deadline!: Date | null;
    submission_date!: Date | null;
    comment!: string | null;
    author_name!: string;
    status!: StatusEnum;
    topic!: string;
    number_of_pages!: number;
    payment_status!: PaymentStatusEnum;
    type!: OrdersTypesEnum;
    file_path!: string | null;
    social_media!: string | null;
    discipline!: Discipline;
}

Order.init(
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
        discipline_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Discipline,
                key: 'id',
            },
        },
        subject_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Subject,
                key: 'id',
            },
        },
        subject_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        application_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        cost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
        deadline: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        submission_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        author_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
        },
        status: {
            type: DataTypes.ENUM,
            values: Object.values(StatusEnum),
            allowNull: false,
            defaultValue: StatusEnum.APPLICATION_SUBMITTED,
        },
        topic: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        number_of_pages: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        payment_status: {
            type: DataTypes.ENUM,
            values: Object.values(PaymentStatusEnum),
            allowNull: false,
            defaultValue: PaymentStatusEnum.NOT_PAID,
        },
        type: {
            type: DataTypes.ENUM,
            values: Object.values(OrdersTypesEnum),
            allowNull: false,
        },
        file_path: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        social_media: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        sequelize,
        tableName: 'orders',
        modelName: 'Order',
        timestamps: false,
        underscored: true,
    }
);

Order.belongsTo(Discipline, { foreignKey: 'discipline_id' });
Order.belongsTo(Subject, { foreignKey: 'subject_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });
