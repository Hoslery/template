import React, { FC } from "react";
import FooterTopCol from "./FooterTopCol";
import { footerCol } from "../../../utils/constants";

const FooterTop: FC = () => {
    return (
        <div className="footer-top">
            <div className="container">
                <div className="footer-top-row">
                    {footerCol.map((col,index) => 
                        <FooterTopCol col={col} key={index}/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FooterTop;