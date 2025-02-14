import React, { useState, useEffect } from 'react';
import { OrderTypesEnum } from '@/enums/orders-type-enum';
import { SubjectsByDiscipline, SubjectsEnum } from '@/enums/subject-type-enum';
import api from '@/utils/api';
import './CreateOrderModal.css';

type FormData = {
    type: keyof typeof OrderTypesEnum | '';
    discipline_name: string;
    subject_name: string;
    number_of_pages: string;
    deadline: string;
    comment: string;
    topic: string;
    social_media: string;
};

const disciplineMap: Record<SubjectsByDiscipline, keyof typeof SubjectsEnum> = {
    [SubjectsByDiscipline.ECONOMIC_SCIENCES]: 'ECONOMIC_SCIENCES',
    [SubjectsByDiscipline.HUMANITIES]: 'HUMANITIES',
    [SubjectsByDiscipline.MATHEMATICAL_SCIENCES]: 'MATHEMATICAL_SCIENCES',
    [SubjectsByDiscipline.NATURAL_SCIENCES]: 'NATURAL_SCIENCES',
    [SubjectsByDiscipline.LAW]: 'LAW',
};


const CreateOrderModal: React.FC<{ onClose: () => void; onOrderCreated: () => void }> = ({ onClose, onOrderCreated }) => {
    const [selectedDiscipline, setSelectedDiscipline] = useState<SubjectsByDiscipline | ''>('');
    const [subjects, setSubjects] = useState<any[]>([]);
    const [formData, setFormData] = useState<FormData>({
        type: '',
        discipline_name: '',
        subject_name: '',
        number_of_pages: '',
        deadline: '',
        comment: '',
        topic: '',
        social_media: '',
    });
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const handleDisciplineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const discipline = e.target.value as SubjectsByDiscipline;
        setFormData({ ...formData, discipline_name: discipline, subject_name: '' });
        setSelectedDiscipline(discipline);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    useEffect(() => {
        if (selectedDiscipline) {
            const selectedKey = disciplineMap[selectedDiscipline];
            const selectedSubjects = SubjectsEnum[selectedKey] || [];
            setSubjects(selectedSubjects);
        } else {
            setSubjects([]);
        }
    }, [selectedDiscipline]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { type, discipline_name, subject_name, number_of_pages, deadline, topic, social_media } = formData;
        const missingFields: string[] = [];

        if (!type) missingFields.push('Тип роботи');
        if (!discipline_name) missingFields.push('Дисципліна');
        if (!subject_name) missingFields.push('Предмет');
        if (!number_of_pages) missingFields.push('Кількість сторінок');
        if (!deadline) missingFields.push('Дедлайн');
        if (!topic) missingFields.push('Тема');
        if (!social_media) missingFields.push('Соціальні мережі');

        if (missingFields.length > 0) {
            setMessage(`Будь ласка, заповніть обов'язкові поля: ${missingFields.join(', ')}.`);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const disciplineInUkr = SubjectsByDiscipline[discipline_name as keyof typeof SubjectsByDiscipline];
            const selectedSubject = subjects.find((subject: any) => subject.id === parseInt(subject_name));
            const subjectName = selectedSubject ? selectedSubject.name : '';

            const orderType = Object.keys(OrderTypesEnum).includes(type)
                ? OrderTypesEnum[type as keyof typeof OrderTypesEnum]
                : type;

            const dataToSend = {
                type: orderType,
                discipline_name: disciplineInUkr,
                subject_name: subjectName,
                number_of_pages,
                deadline,
                comment: formData.comment,
                topic,
                social_media,
                file,
            };

            const { data } = await api.post('/order', dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            setMessage('Ваша заявка успішно подана.');
            setSuccess(true);

            setTimeout(() => {
                setSuccess(false);
                onOrderCreated();
                onClose();
            }, 2500);
        } catch (error) {
            setMessage('Помилка створення заявки.');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    ✖
                </button>
                <h3>Оформіть заявку</h3>
                <form onSubmit={handleSubmit} className="order-form">
                    <div className="label">
                        Тип роботи:
                        <select name="type" value={formData.type} onChange={handleInputChange}>
                            <option value="">Виберіть тип</option>
                            {Object.entries(OrderTypesEnum).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="label">
                        Дисципліна:
                        <select name="discipline_name" value={formData.discipline_name} onChange={handleDisciplineChange}>
                            <option value="">Виберіть дисципліну</option>
                            {Object.entries(SubjectsByDiscipline).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="label">
                        Предмет:
                        <select name="subject_name" value={formData.subject_name} onChange={handleInputChange} disabled={!formData.discipline_name}>
                            <option value="">Виберіть предмет</option>
                            {subjects.map((subject: any) => (
                                <option key={subject.id} value={subject.id}>
                                    {subject.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="label">
                        Кількість сторінок:
                        <input type="number" name="number_of_pages" value={formData.number_of_pages} onChange={handleInputChange} />
                    </div>
                    <div className="label">
                        Дедлайн:
                        <input type="date" name="deadline" value={formData.deadline} onChange={handleInputChange} />
                    </div>
                    <div className="label">
                        Тема:
                        <input type="text" name="topic" value={formData.topic} onChange={handleInputChange} />
                    </div>
                    <div className="label">
                        Коментар:
                        <textarea name="comment" value={formData.comment} onChange={handleInputChange} />
                    </div>
                    <div className="label">
                        Нік в Telegram або телефон:
                        <input type="text" name="social_media" value={formData.social_media} onChange={handleInputChange} />
                    </div>
                    <div className="label">
                        Прикріпити файл:
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <button type="submit" className="submit-button">
                        Створити заявку
                    </button>
                </form>
                {message && <p className={`message ${success ? 'success' : ''}`}>{message}</p>}
            </div>
        </div>
    );
};

export default CreateOrderModal;
