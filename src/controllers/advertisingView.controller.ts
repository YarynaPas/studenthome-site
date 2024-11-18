import {Request, Response} from 'express';
import {advertisingViewService} from '../services/advertisingView.service';

export const incrementViewCount = async (req: Request, res: Response): Promise<void> => {
    try {
        const carId = req.params.id;
        await advertisingViewService.incrementViewCount(Number(carId));
        res.status(200).json({message: 'View count updated successfully'});
    } catch (error) {
        res.status(500).json({message: 'Failed to update view count', error});
    }
};

export const getCarStatistics = async (req: Request, res: Response): Promise<void> => {
    try {
        const carId = req.params.id;
        const statistics = await advertisingViewService.getCarStatistics(Number(carId));
        res.status(200).json(statistics);
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch statistics', error});
    }
};
