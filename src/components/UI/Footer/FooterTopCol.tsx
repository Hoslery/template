import React, { FC } from "react";
import { IFooterCol, ISimpleList } from "../../../types/types";
import FooterTopColItem from "./FooterTopColItem";

interface FooterTopColProps {
    col: IFooterCol
}

const FooterTopCol: FC<FooterTopColProps> = ({col}) => {
    return (
        <div className="footer-top-col">
            <h2 className="footer-heading">{col.title}</h2>
            <ul className="footer-links list-type-none">
                {col.links.map((link) =>
                    <FooterTopColItem
                        text={link.text} 
                        key={link.id}
                    />
                )}
            </ul>
        </div>
    );
};

export default FooterTopCol;