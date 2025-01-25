import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface DisciplineAttributes {
    id: number;
    discipline_name: string;
}

export interface DisciplineCreationAttributes extends Optional<DisciplineAttributes, 'id'> {}

export class Discipline extends Model<DisciplineAttributes, DisciplineCreationAttributes> {
    id!: number;
    discipline_name!: string;
}

Discipline.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        discipline_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'disciplines',
        modelName: 'Discipline',
        timestamps: false,
        underscored: true,
    }
);
