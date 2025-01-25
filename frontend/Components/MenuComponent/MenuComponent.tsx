'use client';

import React from 'react';
import Link from 'next/link';
import './menu.css';
import Image from 'next/image';
import AccountMenu from '@/Components/AccountMenu/AccountMenu';

const Menu: React.FC = () => {
    return (
        <div className="menu">
            <nav>
                <Image
                    src="/images/logo horizontal color.png"
                    alt="logo"
                    width={254}
                    height={60}
                    margain-right={10}
                />
                <div className="links">
                    <div className="menu-item">
                        <Link href={'/'}>Головна</Link>
                    </div>
                    <div className="menu-item">
                        <Link href={'/prices'}>Ціни</Link>
                    </div>
                    <div className="menu-item">
                        <Link href={'/reviews'}>Відгуки</Link>
                    </div>
                    <div className="menu-item">
                        <Link href={'/about-us'}>Про нас</Link>
                    </div>
                    <div className="menu-item">
                        <Link href={'/spivpratsya'}>Співпраця</Link>
                    </div>
                </div>
                <div className="menu-account">
                    <AccountMenu/>
                </div>
            </nav>
        </div>
    );
};

export default Menu;
