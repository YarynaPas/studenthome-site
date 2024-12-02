"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvertisingView = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class AdvertisingView extends sequelize_1.Model {
}
exports.AdvertisingView = AdvertisingView;
AdvertisingView.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    advertisingId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    viewDate: { type: sequelize_1.DataTypes.DATE, allowNull: false },
    views: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
}, {
    sequelize: database_1.sequelize,
    modelName: 'AdvertisingView',
    tableName: 'advertising_views',
    timestamps: false,
    underscored: true,
});
