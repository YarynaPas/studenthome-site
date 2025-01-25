import React from 'react';
import Menu from "@/Components/MenuComponent/MenuComponent";
import FooterComponent from "@/Components/FooterComponent/FooterComponent";
import './styles/prices.css';
import Image from "next/image";
import FAQ from "@/Components/FAQ/FAQ";

const Prices = () => {
    return (
        <div>
            <div className="menu">
                <Menu/>
            </div>
            <div className="prices">
                <Image
                    src="/images/Group 19.svg"
                    alt="Background Image"
                    layout="fill"
                    className="background-image"
                />
                <div className="overlay-content">
                    <h2 className="center-title">Ціни</h2>
                    <div className="h3-container">
                        <h3>Послуги</h3>
                    </div>
                    <div className="image-container">
                        <Image
                            src="/images/Frame 217.svg"
                            alt="Smaller Image"
                            layout="intrinsic"
                            width={800}
                            height={500}
                            className="smaller-image"
                        />
                    </div>
                </div>
            </div>
            <h2 className="order-title">Оформити замовлення</h2>
            <div className="order-section">
            </div>
            <div className='collaboration-image'>
                <Image src='/images/form.svg' layout="responsive" width={600} height={400}
                       alt="співпраця"/>
            </div>
            <div className='h2'>
                <h2>АБО</h2>
            </div>
            <div className="collaboration-image-1">
                <div className="background-image">
                    <Image src="/images/Frame 183.svg" layout="responsive" width={600} height={400} alt="співпраця"/>
                </div>
                <div className="collaboration-image-1">
                    <div className="background-rectangle"></div>
                    <div className="collaboration-content">
                        <div className="image-telegram">
                            <Image src="/images/svg2 1.svg" layout="responsive" width={600} height={500}
                                   alt="співпраця"/>
                        </div>
                        <div className="telegram-div">
                            <h2>
                                Напишіть нам у Telegram для консультації, підрахунку ціни та часу. Детально опишіть вид
                                роботи, тему та дедлайн, і ми надамо Вам точну вартість та терміни
                            </h2>
                            <button
                                className="telegram-button"
                                onClick={() => window.open("https://t.me/studenthome_kursova", "_blank")}
                            >
                                <span className="telegram-text">Написати в</span>
                                <Image
                                    src="/images/icons8-telegram.svg"
                                    alt="Telegram"
                                    width={38}
                                    height={38}
                                    className="telegram-icon"
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <div className='part3'>
                    <h2>Схема співпраці</h2>
                    <div className='collaboration-image'>
                        <Image src='/images/Group 26.svg' layout="responsive" width={600} height={400}
                               alt="співпраця"/>
                    </div>
                </div>
                <div className='part3'>
                    <h2>Часті запитання студентів</h2>
                </div>
                <div className='part4'>
                    <FAQ></FAQ>
                </div>

            </div>

            <FooterComponent/>
        </div>
    );
};

export default Prices;
