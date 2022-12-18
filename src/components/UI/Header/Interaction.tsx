import React, { FC } from "react";
import { Link } from "react-router-dom";
import AuthList from "./AuthList";
import NavList from "./NavList";
import {navItems, authItems} from "../../../utils/constants";

const Interaction: FC = () => {
    return (
        <div className="interaction">
            <Link className="search-toggle" to="/search">Search</Link>
            <div className="interaction-nav">
                <NavList navItems={navItems}/>
            </div>
            <AuthList authItems={authItems}/>
        </div>
    );
};

export default Interaction;