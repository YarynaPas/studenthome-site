"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectService = exports.SubjectService = void 0;
// src/services/subject.service.ts
const subject_model_1 = require("../models/subject.model");
class SubjectService {
    getSubjectsByDiscipline(disciplineId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield subject_model_1.Subject.findAll({
                where: { discipline_id: disciplineId },
            });
        });
    }
}
exports.SubjectService = SubjectService;
exports.subjectService = new SubjectService();
