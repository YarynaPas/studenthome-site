import SignUp from "@/Components/Auth/SighUpComponent";
import './styles/body.css'
import FooterComponent from "@/Components/FooterComponent/FooterComponent";
import React from "react";
import Menu from "@/Components/MenuComponent/MenuComponent";

const SignUpPage = () => {
    return (
        <div>
            <Menu></Menu>
            <SignUp />
            <FooterComponent></FooterComponent>
        </div>
    );
};

export default SignUpPage;

