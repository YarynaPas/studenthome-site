import React from 'react';
import Menu from "@/Components/MenuComponent/MenuComponent";
import Image from "next/image";
import FooterComponent from "@/Components/FooterComponent/FooterComponent";
import './styles/rewiews.css';

const Reviews = () => {
    return (
        <div>
            <div className="menu">
                <Menu />
            </div>
            <div className="background-container">
                <Image
                    src="/images/this-is-business-community-office-district 2.svg"
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
                    <h2 className="center-title">Відгуки</h2>
                    <div className="about-us-box">
                        <div className="image-container">
                            <Image
                                src="/images/Frame 259.svg"
                                alt="Smaller Image"
                                layout="intrinsic"
                                width={3000}  /* Можна збільшити розмір для ще більшого ефекту */
                                height={2000}
                                className="smaller-image"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='insta'>
                <div className='insta-box'>
                    <div className='insta-box-h3'>
                    <h3><a href="https://www.instagram.com/studenthome_ua/" target="_blank" rel="noopener noreferrer">Більше відгуків у нашому </a></h3>
                    </div>
                    <div className='insta-box-img'>
                        <Image
                            src="/images/instagram-logo.svg"
                            alt="Instagram"
                            width={100}
                            height={100}
                        />
                    </div>
                </div>
            </div>
            <FooterComponent/>
        </div>
    );
};

export default Reviews;
