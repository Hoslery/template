import React, { FC } from "react";

interface LangListItemProps {
    text: string
}

const LangListItem: FC<LangListItemProps> = ({text}) => {
    const className = `footer-language ${text === 'English' ? 'footer-language--active' : ''}`

    return (
        <li className={className}>
            <button className="lang-link button-set" type="submit">
                {text}
            </button>
        </li>
    );
};

export default LangListItem;