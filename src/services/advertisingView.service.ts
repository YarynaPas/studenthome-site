import {AdvertisingView} from '../models/advertising.views.model';
import {Car} from '../models/car.model';
import {sequelize} from "../config/database";

export class AdvertisingViewService {

    async incrementViewCount(advertisingId: number): Promise<void> {
        const viewDate = new Date();

        const existingView = await AdvertisingView.findOne({
            where: {
                advertisingId,
                viewDate: viewDate.toISOString().split('T')[0],
            },
        });

        if (existingView) {
            existingView.views += 1;
            await existingView.save();
        } else {
            await AdvertisingView.create({
                advertisingId,
                viewDate: viewDate,
                views: 1,
            });
        }

        const car = await Car.findByPk(advertisingId);
        if (car) {
            car.viewCount += 1;
            await car.save();
        }
    }

    async getCarStatistics(carId: number): Promise<any> {
        const car = await Car.findByPk(carId);
        if (!car) {
            throw new Error('Car not found');
        }

        const viewsPerDay = await AdvertisingView.sum('views', {
            where: {
                advertisingId: car.id,
                viewDate: new Date().toISOString().split('T')[0],
            },
        });


        const averagePriceInRegion = await Car.findOne({
            attributes: [
                [sequelize.fn('AVG', sequelize.col('price')), 'avgPrice'],
            ],
            where: {region: car.region},
        });

        const averagePriceInUkraine = await Car.findOne({
            attributes: [
                [sequelize.fn('AVG', sequelize.col('price')), 'avgPrice'],
            ],
        });

        return {
            viewsPerDay: viewsPerDay || 0,
            averagePriceInRegion: averagePriceInRegion?.get('avgPrice'),
            averagePriceInUkraine: averagePriceInUkraine?.get('avgPrice'),
        };
    }
}

export const advertisingViewService = new AdvertisingViewService();
