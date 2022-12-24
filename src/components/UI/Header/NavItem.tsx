import React, { FC } from "react";
import { Link } from "react-router-dom";

interface NavItemProps {
    text: string
}

const NavItem: FC<NavItemProps> = ({text}) => {
    return (
        <li className="nav-item">
            <Link className="nav-link name-link" to="/popular">
                {text}
            </Link>
        </li>
    );
};

export default NavItem;