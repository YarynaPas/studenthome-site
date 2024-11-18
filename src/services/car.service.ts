import {Car} from '../models/car.model';

export class CarService {
    async getCars() {
        return await Car.findAll();
    }

    async getCarById(id: number) {
        return await Car.findByPk(id);
    }

    async createCar(carData: { makeId: number; modelId: number; userId: number }) {
        return await Car.create(carData);
    }

    async updateCar(id: number, updateData: { makeId: number; modelId: number }) {
        const car = await Car.findByPk(id);
        if (!car) throw new Error('Car not found');
        return await car.update(updateData);
    }

    async deleteCar(id: number) {
        const car = await Car.findByPk(id);
        if (!car) return false;
        await car.destroy();
        return true;
    }
}
