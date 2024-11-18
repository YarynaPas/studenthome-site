import {Car} from '../models/car.model';

export class CarRepository {
    async getCars() {
        return await Car.findAll();
    }

    async getCarById(id: number) {
        return await Car.findByPk(id);
    }

    async createCar(carData: { makeId: number; modelId: number; userId: number }) {
        return await Car.create(carData);
    }

    async deleteCar(id: number) {
        const car = await Car.findByPk(id);
        if (!car) return false;
        await car.destroy();
        return true;
    }
}
