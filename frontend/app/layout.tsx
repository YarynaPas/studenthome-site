'use client';
import React from 'react';
import "./globals.css";

type PropType = {
    children: React.ReactNode;
};

const RootLayout: React.FC<PropType> = ({ children }) => {
    return (
        <html lang="en">
        <body>
        <main>{children}</main>
        </body>
        </html>
    );
};

export default RootLayout;
