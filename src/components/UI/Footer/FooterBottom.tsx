import React, { FC } from "react";
import FooterBottomCol from "./FooterBottomCol";

const FooterBottom: FC = () => {
    
    return (
        <div className="footer-bottom">
            <div className="container">
                <div className="row">
                    <FooterBottomCol/>
                    <div className="logo-bottom footer-bottom-col">
                        <p>Audioscrobbler</p>
                        <img className="logo-bottom-marg" src="/images/logo_bottom.png" width="37" height="20" alt="Last.fm 'as' logo"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterBottom;