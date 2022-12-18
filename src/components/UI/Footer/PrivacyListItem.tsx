import React, { FC } from "react";
import { Link } from "react-router-dom";

interface PrivacyItemProps {
    text: string,
    extraInf?: string
}

const PrivacyListItem: FC<PrivacyItemProps> = ({text, extraInf}) => {
    return (
        <li className="footer-privacy-item">
            <Link className="name-link" to="/popular">
                {text}
            </Link> {extraInf}
        </li>
    );
};

export default PrivacyListItem;