import React, { FC } from "react";
import PrivacyList from "./PrivacyList";
import LangList from "./LangList";
import { languages, privacyItems } from "../../../utils/constants";

const FooterBottomCol: FC = () => {

    return (
        <div className="footer-bottom-col">
            <LangList languages={languages}/>

            <p className="footer-timezone">
            Time zone: <strong>Europe/Moscow</strong>
            </p>

            <PrivacyList privacyItems={privacyItems}/>
        </div>
    );
};

export default FooterBottomCol;