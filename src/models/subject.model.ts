import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface SubjectAttributes {
    id: number;
    subject_name: string;
    discipline_id: number;
}

export interface SubjectCreationAttributes extends Optional<SubjectAttributes, 'id'> {}

export class Subject extends Model<SubjectAttributes, SubjectCreationAttributes> {
    id!: number;
    subject_name!: string;
    discipline_id!: number;
}

Subject.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        subject_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        discipline_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'subjects',
        modelName: 'Subject',
        timestamps: false,
        underscored: true,
    }
);
