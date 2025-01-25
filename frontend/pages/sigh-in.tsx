import SignIn from "@/Components/Auth/SighInComponent";
import FooterComponent from "@/Components/FooterComponent/FooterComponent";
import React from "react";
import './styles/body.css'
import Menu from "@/Components/MenuComponent/MenuComponent";

const SignInPage = () => {
    return (
        <div>
            <Menu></Menu>
            <SignIn />
            <FooterComponent></FooterComponent>
        </div>
         );

};

export default SignInPage;
