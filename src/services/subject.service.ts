// src/services/subject.service.ts
import { Subject } from '../models/subject.model';

export class SubjectService {
    async getSubjectsByDiscipline(disciplineId: number) {
        return await Subject.findAll({
            where: { discipline_id: disciplineId },
        });
    }
}

export const subjectService = new SubjectService();
