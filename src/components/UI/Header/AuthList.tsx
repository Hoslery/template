import React, {FC, useState} from "react";
import { ISimpleList } from "../../../types/types";
import AuthItem from "./AuthItem";
import NavItem from "./NavItem";

interface AuthListProps {
    authItems: ISimpleList[]
}

const AuthList: FC<AuthListProps> = ({authItems}) => {

    return (
        <ul className="site-auth list-type-none">
            {authItems.map((item) =>
                <AuthItem 
                    text={item.text} 
                    key={item.id}
                />
            )}
        </ul>
    );
};

export default AuthList;