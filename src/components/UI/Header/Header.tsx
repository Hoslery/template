import React, { FC } from "react";
import { Link } from "react-router-dom";
import Interaction from "./Interaction";
import PlayerBar from "./PlayerBar";

/**
 * Функциональный компонент, отвечающий за Header
 */
const Header: FC = () => {

    return (
        <header className="header">
            <PlayerBar/>
            <div className="logo-center">
                <Link className="logo" to="/popular">Last.fm</Link>
            </div>
            <Interaction/>
        </header>
    );
};

export default Header;