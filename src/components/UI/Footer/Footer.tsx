import React, { FC } from "react";
import FooterBottom from "./FooterBottom";
import FooterTop from "./FooterTop";

const Footer: FC = () => {
    return (
        <footer className="footer">
            <FooterTop/>
            <FooterBottom/>
      </footer>
    );
};

export default Footer;