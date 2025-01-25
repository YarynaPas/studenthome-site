
import { Router } from 'express';
import { Discipline } from '../models/discipline.model';

const router = Router();

router.get('/disciplines', async (req, res) => {
    try {
        const disciplines = await Discipline.findAll(); // Отримання всіх дисциплін
        res.json(disciplines);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Помилка сервера при отриманні дисциплін.' });
    }
});

export default router;
