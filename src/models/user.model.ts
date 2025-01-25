import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { RoleTypeEnum } from '../enum/role-type-enum';

export interface UserAttributes {
    id: number;
    full_name? : string;
    email: string;
    password: string;
    role: RoleTypeEnum;
    university?: string;
    specialty?: string;
    research_group?: string;
    phone_number?: string;
    social_media?: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id!: number;
    full_name? : string;
    email!: string;
    password!: string;
    role!: RoleTypeEnum;
    university?: string;
    specialty?: string;
    research_group?: string;
    phone_number?: string;
    social_media?: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        full_name:{
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM,
            values: Object.values(RoleTypeEnum),
            allowNull: false,
            defaultValue: RoleTypeEnum.User,
        },
        university: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        specialty: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        research_group: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        social_media: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'users',
        modelName: 'User',
        timestamps: false,
        underscored: true,
    }
);
