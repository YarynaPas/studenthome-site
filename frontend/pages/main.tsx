import React from 'react';
import FooterComponent from "@/Components/FooterComponent/FooterComponent";
import Menu from "@/Components/MenuComponent/MenuComponent";
import Image from "next/image";
import './styles/main.css';
import FAQ from "@/Components/FAQ/FAQ";

const Main = () => {
    return (
        <div>
            <div className="menu">
                <Menu/>
            </div>
            <div className='main'>
                <div className="image-container">
                    <Image
                        src="/images/Group 18.svg"
                        alt="Background Image"
                        layout="fill"
                        className="elegant-woman"
                    />
                    <div className='text-box'>
                        <div className='box1'>
                            <h2>ЕФЕКТИВНА ДОПОМОГА СТУДЕНТАМ</h2>
                            <p className="main-text">Написання будь-якої студентської роботи якісно та по доступній
                                ціні.</p>
                            <p className="main-text">Studenthome - це коло сучасних експертів, які зможуть бездоганно
                                виконати твою
                                студентську роботу з економічних, правових, гуманітарних та інших дисциплін.</p>
                            <div className='qualities'>
                                <div className='box'>
                                    <img src={'/images/Tumer_fill.svg'} alt="Icon"/>
                                    <h3>Швидке виконання</h3>
                                </div>
                                <div className='box'>
                                    <img src={'/images/Wallet_alt_fill.svg'} alt="Icon"/>
                                    <h3>Доступна ціна</h3>
                                </div>
                                <div className='box'>
                                    <img src={'/images/Star_fill.svg'} alt="Icon"/>
                                    <h3>Відмінна якість</h3>
                                </div>
                                <div className='box'>
                                    <div className='box-trophy'>
                                        <img src={'/images/Trophy.svg'} alt="Icon"/>
                                        <h3>Гарантований успіх</h3><br/>
                                    </div>
                                </div>
                                <button className="signup-button" onClick={() => window.location.href = '/sigh-up'}>
                                    Замовити роботу
                                </button>
                            </div>
                        </div>
                        <div className='box2'>
                            <img src={'/images/svg3.svg'} alt="Additional Icon"/>
                        </div>
                    </div>
                </div>
                <div className='h2'>
                    <h2> Чому обирають нас?</h2>
                </div>
                <div className='part2'>
                    <div className='qualities-10'>
                        <div className='quality-1'>
                            <div className="quality-item">
                                <Image src='/images/Component 1.svg' width={140} height={140} alt="1"/>
                                <p className="quality-text">Для нас не важлива складність роботи. У нас ти зможеш
                                    замовити роботу будь-якої складності і не турбуватись про її якість.</p>
                            </div>
                        </div>
                        <div className='quality-1'>
                            <div className="quality-item">
                                <Image src='/images/Component 2.svg' width={140} height={140} alt="2"/>
                                <p className="quality-text">Приємні ціни. Курсова робота від 1000 грн.</p>
                            </div>
                        </div>
                        <div className='quality-1'>
                            <div className="quality-item">
                                <Image src='/images/Component 3.svg' width={140} height={140} alt="3"/>
                                <p className="quality-text">Комплексні послуги. Ми готуємо для тебе вже оформлену,
                                    відкориговану, вичитану та готову для здачі роботу.</p>
                            </div>
                        </div>
                        <div className='quality-1'>
                            <div className="quality-item">
                                <Image src='/images/Component 4.svg' width={140} height={140} alt="4"/>
                                <p className="quality-text"> Висока унікальність. Виконуємо роботи з унікальністю (до
                                    95%), все залежить від вимог викладача ВУЗУ.</p>
                            </div>
                        </div>
                        <div className='quality-1'>
                            <div className="quality-item">
                                <Image src='/images/Component 5.svg' width={140} height={140} alt="5"/>
                                <p className="quality-text"> Безкоштовні доопрацювання. Ми пропонуємо супровід твоєї
                                    роботи до її успішного захисту. Передбачаємо коригування в межах початкових
                                    вимог.</p>
                            </div>
                        </div>
                        <div className='quality-1'>
                            <div className="quality-item">
                                <Image src='/images/Component 6.svg' width={140} height={140} alt="6"/>
                                <p className="quality-text"> Перевірка на антиплагіат –якщо є конкретна програма,
                                    вказуєте при оформленні замовлення.</p>
                            </div>
                        </div>
                        <div className='quality-1'>
                            <div className="quality-item">
                                <Image src='/images/Component 7.svg' width={140} height={140} alt="7"/>
                                <p className="quality-text"> Попереднє ознайомлення з замовленням до оплати. Написання
                                    по завдатку 50% та решту по виконанні.</p>
                            </div>
                        </div>
                        <div className='quality-1'>
                            <div className="quality-item">
                                <Image src='/images/Component 8.svg' width={140} height={140} alt="8"/>
                                <p className="quality-text"> Повністю індивідуальне виконання. Всі роботи пишуться за
                                    вимогами замовника. Звіт перевірки прикріпляємо.</p>
                            </div>
                        </div>
                        <div className='quality-1'>
                            <div className="quality-item">
                                <Image src='/images/Component 9.svg' width={140} height={140} alt="9"/>
                                <p className="quality-text"> Плану якщо немає, складаємо на погодження (він входить у
                                    вартість замовлення).</p>
                            </div>
                        </div>
                        <div className='quality-1'>
                            <div className="quality-item">
                                <Image src='/images/Component 10.svg' width={140} height={140} alt="10"/>
                                <p className="quality-text"> Є можливість термінового замовлення.</p>
                            </div>
                        </div>
                        <div className='quality-1'>
                            <div className="quality-item">
                                <Image src='/images/Component 11.svg' width={140} height={140} alt="11"/>
                                <p className="quality-text"> Конфіденційність - гарантуємо анонімність.</p>
                            </div>
                        </div>
                        <div className='quality-1'>
                            <div className="quality-item">
                                <Image src='/images/Component 12.svg' width={140} height={140} alt="12"/>
                                <p className="quality-text">Роботи виконують викладачі, тому ти можеш бути впевнений у
                                    якості їх виконання.</p>
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
                        <Image src='/images/Frame 255.svg' layout="responsive" width={1520} height={1235}
                               alt="відгуки"/>
                    </div>
                    <div className='part3'>
                        <h2>Ціни</h2>
                        <div className='imagies'>
                            <div className='imagies-1'>
                                <Image src='/images/Frame 181.svg' layout="responsive" width={1520} height={840}
                                       alt="відгуки"/>
                            </div>
                            <div className='imagies-2'>
                                <Image src='/images/Frame 184.svg' layout="responsive" width={1520} height={840}
                                       alt="відгуки"/>
                            </div>
                        </div>
                        <div className='textt'>
                            <div className='textt-1'>
                                <p>*В даній таблиці вказані орієнтовні терміни виконання робіт.
                                    Чим важче завдання тим більше часу знадобиться на його виконання. Чим менший термін
                                    виконання, тим вища буде ціна.</p>
                                <p> **Деякі роботи можуть бути написані і швидше!</p>
                                <p> ***Термін написання залежить від складності замовлення.</p>
                            </div>
                            <div className='textt-2'>
                                <h3>АБО</h3><br/>
                                <button className="telegram-button"
                                        onClick={() => window.open("https://t.me/studenthome_kursova", "_blank")}>
                                    <span className="telegram-text"> Написати в</span>
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
                    <div className='collaboration-image'>
                        <Image src='/images/Group 22.svg' layout="responsive" width={600} height={400}
                               alt="співпраця"/>
                    </div>
                    <section id="faq-section" className="faq-section"> </section>
                        <div className='part3'>
                            <h2>Часті запитання студентів</h2>
                        </div>
                        <div className='part4'>
                            <FAQ></FAQ>
                        </div>

                </div>
            </div>
            <FooterComponent/>
        </div>
    );
};

export default Main;
