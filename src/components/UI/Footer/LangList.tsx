import React, { FC } from "react";
import { ISimpleList } from "../../../types/types";
import LangListItem from "./LangListItem";

interface LangListProps {
    languages: ISimpleList[]
}

const LangList: FC<LangListProps> = ({languages}) => {
    return (
        <ul className="languages">
            {languages.map((lang) =>
                <LangListItem
                    text={lang.text} 
                    key={lang.id}
                />
            )}                     
        </ul>
    );
};

export default LangList;