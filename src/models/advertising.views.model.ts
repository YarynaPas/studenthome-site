import {Model, DataTypes, Optional} from 'sequelize';
import {sequelize} from "../config/database";

export interface AdvertisingViewAttributes {
    id: number;
    advertisingId: number;
    viewDate: Date;
    views: number;
}

export interface AdvertisingViewCreationAttributes extends Optional<AdvertisingViewAttributes, 'id'> {
}

export class AdvertisingView extends Model<AdvertisingViewAttributes, AdvertisingViewCreationAttributes> implements AdvertisingViewAttributes {
    id!: number;
    advertisingId!: number;
    viewDate!: Date;
    views!: number;
}

AdvertisingView.init(
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        advertisingId: {type: DataTypes.INTEGER, allowNull: false},
        viewDate: {type: DataTypes.DATE, allowNull: false},
        views: {type: DataTypes.INTEGER, defaultValue: 0},
    },
    {
        sequelize,
        modelName: 'AdvertisingView',
        tableName: 'advertising_views',
        timestamps: false,
        underscored: true,
    }
);
