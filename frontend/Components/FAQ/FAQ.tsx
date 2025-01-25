import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAnswer = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        { question: "Від чого залежить вартість замовлення?", answer: "В першу чергу вартість залежить від складності та виду роботи. Також суттєво впливає термін виконання роботи, чим він менше-тим вище вартість роботи. Так само важливий обсяг роботи." },
        { question: "Як отримати свою роботу?", answer: "Зазвичай відправляємо готові курсові на e-mail або завантажте її в особистому кабінеті. Якщо потрібно, можемо відправити в Viber або Telegram. Також можна роздрукувати." },
        { question: "Хто пише роботи?", answer: "Наші роботи виконують аспіранти та викладачі. Всі наші фахівці мають тривалий досвід в сфері виконання студентських робіт." },
        { question: "Які гарантії того, що всі мої вимоги до роботи будуть дотримані?", answer: "Завжди намагаємося роботи по зазначеним вимогам. Якщо з нашого боку буде зроблено не за вимогами, доопрацювання безкоштовні." },
        { question: "Скільки часу потрібно на написання моєї роботи?", answer: "Терміни завжди погоджуємо з замовником." },
        { question: "Як оплатити роботу?", answer: "Ви можете оплатити роботу онлайн на нашому сайті ( в особистому кабінеті) переказом на нашу банківську карту." },
    ];

    return (
        <div className="faq">
            {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                    <div className="faq-question" onClick={() => toggleAnswer(index)}>
                        <h3>{faq.question}</h3>
                        <span className="faq-icon">{activeIndex === index ? '-' : '+'}</span>
                    </div>
                    <p className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>{faq.answer}</p>
                </div>
            ))}
        </div>
    );
};

export default FAQ;
