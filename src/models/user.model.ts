import {Model, DataTypes, Optional} from 'sequelize';
import {sequelize} from '../config/database';
import {RoleTypeEnum} from '../enum/role-type-enum';
import {SubscribeEnum} from "../enum/subscribe-enum";

export interface UserAttributes {
    id: number;
    email: string;
    password: string;
    role: RoleTypeEnum;
    accountType: SubscribeEnum;
    status?: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
}

export class User extends Model<UserAttributes, UserCreationAttributes> {
    id!: number;
    email!: string;
    password!: string;
    role!: RoleTypeEnum;
    accountType!: SubscribeEnum;
    status!: string;
}


User.init(
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        email: {type: DataTypes.STRING, allowNull: false, unique: true},
        password: {type: DataTypes.STRING, allowNull: false},
        role: {
            type: DataTypes.ENUM(...Object.values(RoleTypeEnum)),
            allowNull: false,
            defaultValue: RoleTypeEnum.Buyer
        },
        accountType: {type: DataTypes.ENUM(...Object.values(SubscribeEnum)), allowNull: false, defaultValue: 'BASIC'},
        status: {type: DataTypes.ENUM('active', 'banned'), defaultValue: 'active'},
    },
    {
        sequelize,
        tableName: 'users',
        modelName: 'User',
        timestamps: true,
        underscored: true,
    }
);
