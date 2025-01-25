import React from 'react';
import Menu from "@/Components/MenuComponent/MenuComponent";
import Image from "next/image";
import './styles/about-us.css';
import FooterComponent from "@/Components/FooterComponent/FooterComponent";

const AboutUs = () => {
    return (
        <div>
            <div className="menu">
                <Menu/>
            </div>
            <div className="background-container">
                <Image
                    src="/images/this-is-business-community-office-district 1.svg"
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
                    <h2 className="center-title">Про нас</h2>
                    <div className='about-us-box'>
                        <div className="p-container">
                            <p><b>Studenthome</b> - надає допомогу у написанні дипломних, курсових, контрольних робіт,
                                рефератів, звітів по практиці, есе, ІНДЗ та ін. Студентські роботи виконують фахівці у
                                своїй сфері, які мають відповідні знання та досвід написання, виконають роботу якісно та
                                у вказані терміни.
                                Але ми з радістю поповнимо список авторів, тому запрошуємо до співпраці сумлінних та
                                зацікавлених у роботі людей.</p>
                        </div>
                        <div className="image-container">
                            <Image
                                src="/images/aboutus 1.svg"
                                alt="Smaller Image"
                                layout="intrinsic"
                                width={800}
                                height={600}
                                className="smaller-image"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="pros">
                <div className="pros-1">
                    <div className="pros-1-image">
                        <Image
                            src="/images/Time_del_light.svg"
                            alt="Smaller Image"
                            layout="intrinsic"
                            width={250}
                            height={250}
                            className="smaller-image"
                        />
                    </div>
                    <div className="pros-1-p">
                        <h4>Багатьом студентам просто не вистачає сил, часу та терпіння. Саме тому на допомогу приходимо
                            ми – Studenthome зекономить ваш час та виконає роботу відповідно до побажань Вашого
                            наукового керівника.
                            Все що вам потрібно це оформити заявку, вказати всі необхідні дані 1 до 20 хв ми оцінимо
                            вашу роботу та підберемо викладача по спеціальності. </h4>
                    </div>
                </div>
                <div className="pros-1">
                    <div className="pros-1-p">
                        <p>Дуже часто у студентів виникає запитання, як уникнути ситуації коли роботу слід написати
                            терміново.
                            Ми займаємось написанням термінових робіт, але є порада – не відкладайте написання в довгий
                            ящик.</p>
                    </div>
                    <div className="pros-1-image">
                        <Image
                            src="/images/Hourglass.svg"
                            alt="Smaller Image"
                            layout="intrinsic"
                            width={250}
                            height={250}
                            className="smaller-image"
                        />
                    </div>
                </div>
                <div className="pros-1">
                    <div className="pros-1-image">
                        <Image
                            src="/images/thumb_up.svg"
                            alt="Smaller Image"
                            layout="intrinsic"
                            width={250}
                            height={250}
                            className="smaller-image"
                        />

                    </div>
                    <div className="pros-1-p">
                        <p>Виконуємо роботи для всієї України. Цінуємо кожного замовника, тому з відповідальністю
                            ставимось до виконання робіт та підбору відповідного автора.
                            Успішне складання сесії-це кінцевий результат, досягти якого хоче кожен студент.</p>
                    </div>
                </div>
            </div>
            <div className='h2'>
                <h2>Studenthome - це лише якісні студентські роботи!</h2>
            </div>
            <div className='part3'>
                <h2>Контакти</h2>
            </div>
            <div className='contacts'>
                <div className='contact-1'>
                    <div className='contact-image'>
                        <Image
                            src="/images/instagram-logo.svg"
                            alt="Instagram"
                            width={100}
                            height={100}
                        />
                    </div>
                    <p><a href="https://www.instagram.com/studenthome_ua/" target="_blank" rel="noopener noreferrer">Instagram</a></p>
                    <h5><a href="https://www.instagram.com/studenthome_ua/">@studenthome_ua</a></h5>
                </div>
                <div className='contact-1'>
                    <div className='contact-image'>
                        <Image
                            src="/images/telegram-logo.svg"
                            alt="Telegram"
                            width={100}
                            height={100}
                        />
                    </div>
                    <p><a href="https://t.me/studenthome_kursova" target="_blank" rel="noopener noreferrer">Telegram</a></p>
                    <h5><a href="tel:+380666625578">+380666625578</a></h5>
                </div>
                <div className='contact-1'>
                    <div className='contact-image'>
                        <Image
                            src="/images/email-logo.svg"
                            alt="Gmail"
                            width={100}
                            height={100}
                        />
                    </div>
                    <p><a href="studenthome.ua@gmail.com">Gmail</a></p>
                    <h5><a href="studenthome.ua@gmail.com">studenthome.ua@gmail.com</a></h5>
                </div>
            </div>

            <FooterComponent/>
        </div>
    );
};

export default AboutUs;
