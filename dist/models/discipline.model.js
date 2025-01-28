"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discipline = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Discipline extends sequelize_1.Model {
}
exports.Discipline = Discipline;
Discipline.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    discipline_name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'disciplines',
    modelName: 'Discipline',
    timestamps: false,
    underscored: true,
});
