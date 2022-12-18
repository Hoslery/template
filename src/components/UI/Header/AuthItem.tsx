import React, { FC } from "react";
import { Link } from "react-router-dom";

interface AuthItemProps {
    text: string
}

const AuthItem: FC<AuthItemProps> = ({text}) => {
    const className = `name-link ${text === 'Sign Up' ? 'signup': 'nav-link'}`

    return (
        <li className="site-auth-item">
            <Link className={className} to="/popular">
                {text}
            </Link>
        </li>
    );
};

export default AuthItem;