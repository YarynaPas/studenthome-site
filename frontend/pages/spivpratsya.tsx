import React from 'react';
import Menu from "@/Components/MenuComponent/MenuComponent";
import Image from "next/image";
import './styles/spivpratsya.css';
import FooterComponent from "@/Components/FooterComponent/FooterComponent";
const Spivpratsya = () => {
    return (
        <div>
            <div className="menu">
                <Menu/>
            </div>
            <div className="background-container">
                <Image
                    src="/images/this-is-business-community-office-district 3.svg"
                    alt="Background Image"
                    layout="fill"
                    className="background-image"
                />
                <Image
                    src="/images/Rectangle 45.svg"
                    alt="Background Image"
                    layout="fill"
                    className="background-image-2"
                />
                <div className="overlay-content">
                    <h2 className="center-title">Співпраця</h2>
                    <div className='about-us-box'>
                        <div className="p-container">
                            <p><b>Studenthome</b> - завжди поновляє та
                                розширює список авторів тому набираємо висококваліфікованих спеціалістів з різних видів
                                дисциплін для співпраці.</p>
                            Ми гарантуємо:
                            <ul>
                                <li>своєчасну оплату;</li>
                                <li>хороші умови праці;</li>
                                <li>високу з/п (залежно від кількості виконаних робіт);</li>
                                <li>індивідуальний підхід до кожного автора.</li>
                            </ul>
                        </div>
                        <div className="image-container">
                            <Image
                                src="/images/cooperation 1.svg"
                                alt="Smaller Image"
                                layout="intrinsic"
                                width={900}
                                height={600}
                                className="smaller-image"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='part3'>
                <h2>Співпраця</h2>
            </div>
            <div className='contacts'>
                <div className='contact-1'>
                    <div className='contact-image'>
                        <Image
                            src="/images/Frame 267.svg"
                            alt="Instagram"
                            width={100}
                            height={100}
                        />
                    </div>
                    <h3> Відповідальність</h3>
                    <p> Автори повинні дотримуватись дедлайнів і гарантувати високу якість виконаної роботи.
                        Відповідальне ставлення до завдань забезпечує довіру та стабільну співпрацю.</p>
                </div>
                <div className='contact-1'>
                    <div className='contact-image'>
                        <Image
                            src="/images/Frame 266.svg"
                            alt="Instagram"
                            width={100}
                            height={100}
                        />
                    </div>
                    <h3>Досконале володіння своїм предметом </h3>
                    <p>Автори повинні мати глибокі знання в обраній дисципліні та вміти застосовувати їх на практиці.
                        Це включає здатність створювати якісний, точний і зрозумілий матеріал.</p>
                </div>
                <div className='contact-1'>
                    <div className='contact-image'>
                        <Image
                            src="/images/Frame 269.svg"
                            alt="Instagram"
                            width={100}
                            height={100}
                        />
                    </div>
                    <h3>Творчий підхід</h3>
                    <p>Робота автора передбачає нестандартне мислення для вирішення складних завдань.
                        Творчість допомагає знайти унікальні рішення та створювати цікаві матеріали.</p>
                </div>
                <div className='contact-1'>
                    <div className='contact-image'>
                        <Image
                            src="/images/Frame 270.svg"
                            alt="Instagram"
                            width={100}
                            height={100}
                        />
                    </div>
                    <h3>Доступ до інтернету</h3>
                    <p>Для виконання завдань необхідно мати постійний і стабільний доступ до інтернету.
                        Це дозволяє швидко комунікувати з командою та замовниками.</p>
                </div>
                <div className='contact-1'>
                    <div className='contact-image'>
                        <Image
                            src="/images/Frame 268.svg"
                            alt="Instagram"
                            width={100}
                            height={100}
                        />
                    </div>
                    <h3> Наявність комп’ютера та електронної пошти </h3>
                    <p> Автори повинні володіти технічними засобами для виконання роботи.
                        Електронна пошта є основним засобом зв’язку для обміну матеріалами та інструкціями.</p>
                </div>
            </div>
            <div className='part3'>
                <h2>Що вказати у резюме</h2>
            </div>
            <div className='part2'>
                <div className='qualities-10'>
                    <div className='quality-1'>
                        <div className="quality-item">
                            <Image src='/images/Component 1.svg' width={140} height={140} alt="1"/>
                            <p className="quality-text">Ваші ПІБ</p>
                        </div>
                    </div>
                    <div className='quality-1'>
                        <div className="quality-item">
                            <Image src='/images/Component 2.svg' width={140} height={140} alt="2"/>
                            <p className="quality-text">Контактні дані (E-mail, мобільний телефон)</p>
                        </div>
                    </div>
                    <div className='quality-1'>
                        <div className="quality-item">
                            <Image src='/images/Component 3.svg' width={140} height={140} alt="3"/>
                            <p className="quality-text">Освіту</p>
                        </div>
                    </div>
                    <div className='quality-1'>
                        <div className="quality-item">
                            <Image src='/images/Component 4.svg' width={140} height={140} alt="4"/>
                            <p className="quality-text"> Ваш ЗОШ</p>
                        </div>
                    </div>
                    <div className='quality-1'>
                        <div className="quality-item">
                            <Image src='/images/Component 5.svg' width={140} height={140} alt="5"/>
                            <p className="quality-text"> Досвід написання робіт</p>
                        </div>
                    </div>
                    <div className='quality-1'>
                        <div className="quality-item">
                            <Image src='/images/Component 6.svg' width={140} height={140} alt="6"/>
                            <p className="quality-text"> Кількість вільних годин на добу</p>
                        </div>
                    </div>
                    <div className='quality-1'>
                        <div className="quality-item">
                            <Image src='/images/Component 7.svg' width={140} height={140} alt="7"/>
                            <p className="quality-text"> Бажаний обсяг роботи в (місяць/тиждень)</p>
                        </div>
                    </div>
                    <div className='quality-1'>
                        <div className="quality-item">
                            <Image src='/images/Component 8.svg' width={140} height={140} alt="8"/>
                            <p className="quality-text"> Список предметів за якими ви можете виконувати роботи та види робіт (реферати, курсові, дипломні роботи і т.д).</p>
                        </div>
                    </div>
                    <div className='quality-1'>
                        <div className="quality-item">
                            <Image src='/images/Component 9.svg' width={140} height={140} alt="9"/>
                            <p className="quality-text">5 ваших індивідуальних робіт різного рівня (реферат, курсова і т.д). які звичайно пройшли перевірку на антиплагіат</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='photo'>
                <Image
                    src="/images/Group 27.svg"
                    alt="Instagram"
                    width={1000}
                    height={200}
                />
            </div>
            <FooterComponent/>
        </div>
    );
};

export default Spivpratsya;