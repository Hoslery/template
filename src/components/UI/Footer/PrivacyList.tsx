import React, { FC } from "react";
import { ISimpleList } from "../../../types/types";
import PrivacyListItem from "./PrivacyListItem";

interface PrivacyListProps {
    privacyItems: ISimpleList[]
}

const PrivacyList: FC<PrivacyListProps> = ({privacyItems}) => {
    return (
        <div className="footer-privacy">
            <ul>
                {privacyItems.map((item) =>
                    <PrivacyListItem
                        extraInf={item.extraInf}
                        text={item.text} 
                        key={item.id}
                    />
                )}  
            </ul>  
        </div>
    );
};

export default PrivacyList;