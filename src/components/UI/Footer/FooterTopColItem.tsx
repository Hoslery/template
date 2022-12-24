import React, {FC} from "react";
import { Link } from "react-router-dom";

interface ColItemProps {
    text: string
}

const FooterTopColItem: FC<ColItemProps>  = ({text}) => {
    return (
        <li className="footer-links-item">
            <Link className="name-link" to="/popular">{text}</Link>
        </li>
    );
};

export default FooterTopColItem;