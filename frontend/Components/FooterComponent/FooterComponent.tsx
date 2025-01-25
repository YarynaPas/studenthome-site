'use client';
import './FooterComponent.css';
import React from "react";
import Image from 'next/image';
import Link from 'next/link';

const FooterComponent: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-columns">
                <div className="container">
                    <Image
                        src="/images/logo horizontal white.png"
                        alt="logo"
                        width={254}
                        height={61}
                    />
                    <div className="text1">
                        <p>Studenthome - це лише якісні студентські роботи!</p>
                    </div>
                </div>
                <div className="container">
                    <div className="text2">
                        <Link href="/main">
                            <p>Політика конфіденційності</p>
                        </Link>
                        <Link href="/main">
                            <p>Угода користувача</p>
                        </Link>
                        <Link href="/spivpratsya">
                            <p>Співпраця</p>
                        </Link>
                        <Link href={"#faq-section"}>
                            <p>FAQ</p>
                        </Link>
                    </div>
                </div>
                <div className="container">
                    <div className="data">
                        <div className="text3">
                            <a href="mailto:studenthome.ua@gmail.com">
                                <p>studenthome.ua@gmail.com</p>
                            </a>
                            <a href="tel:+380666625578">
                                <p>+380 666 625 578</p>
                            </a>
                        </div>
                        <div className="social-media">
                            <a href="https://www.instagram.com/studenthome_ua/" target="_blank" rel="noopener noreferrer">
                                <Image
                                    src="/images/icons8-instagram-50.png"
                                    alt="Instagram"
                                    width={48}
                                    height={48}
                                />
                            </a>
                            <a href="https://t.me/studenthome_kursova" target="_blank" rel="noopener noreferrer">
                                <Image
                                    src="/images/icons8-telegram-50.png"
                                    alt="Telegram"
                                    width={48}
                                    height={48}
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;
