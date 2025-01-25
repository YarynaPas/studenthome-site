import {Model, DataTypes, Optional} from 'sequelize';
import {sequelize} from '../config/database';
import {DisciplinesTypeEnum} from "../enum/desceplines-type-enum";

export interface EmployeeAttributes {
    id: number;
    email: string;
    password: string;
    phone_number: string,
    descipline: string,
    subject: string,
    desciplines_id: number,
    subjects_id: number
}

export interface UserCreationAttributes extends Optional<EmployeeAttributes, 'id'> {
}

export class Employee extends Model<EmployeeAttributes, UserCreationAttributes> {
    id!: number;
    email!: string;
    password!: string;
    phone_number!: string;
    descipline!: string;
    subject!: string;
    desciplines_id!: number;
    subjects_id!: number;


}
Employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        descipline: {
            type: DataTypes.ENUM(...Object.values(DisciplinesTypeEnum)),
            allowNull: false },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_number:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        desciplines_id:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        subjects_id:{
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'employees',
        modelName: 'Employee',
        timestamps: true,
        underscored: true,
    }
);

