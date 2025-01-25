import React, { useState } from 'react';
import api from '@/utils/api';
import './ReviewForm.css';

interface ReviewFormProps {
    orderId: number;
    onReviewSubmitted: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ orderId, onReviewSubmitted }) => {
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Користувач не авторизований');
            return;
        }

        try {
            await api.post(
                '/reviews',
                { orderId, rating, comment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setIsSubmitted(true); // Встановлюємо, що відгук надіслано
            onReviewSubmitted();
        } catch (err) {
            setError('Не вдалося створити відгук.');
        }
    };

    if (isSubmitted) {
        return (
            <div className="review-form-submitted">
                <p>Дякуємо за відгук! Заради вас ми стаємо кращими.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="review-form">
            <h3 className="review-form-header">Залишити відгук</h3>
            {error && <p className="review-form-error">{error}</p>}
            <div className="review-form-field">
                <label className="review-form-label">Рейтинг:</label>
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="review-form-input"
                />
            </div>
            <div className="review-form-field">
                <label className="review-form-label">Коментар:</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="review-form-textarea"
                />
            </div>
            <button type="submit" className="review-form-submit">Відправити</button>
        </form>
    );
};

export default ReviewForm;
