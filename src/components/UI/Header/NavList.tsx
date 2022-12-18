import React, {FC, useState} from "react";
import { ISimpleList } from "../../../types/types";
import NavItem from "./NavItem";

interface NavListProps {
    navItems: ISimpleList[]
}

const NavList: FC<NavListProps> = ({navItems}) => {

    return (
        <ul className="interaction-navlist-items list-type-none">
            {navItems.map((item) =>
                <NavItem 
                    text={item.text} 
                    key={item.id}
                />
            )}
        </ul>
    );
};

export default NavList;