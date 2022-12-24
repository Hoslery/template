import React, { FC } from "react";
import { searchNavTitles } from "../../../utils/constants";
import NavigationItem from "./NavigationItem";

/**
 * Функциональный компонент, отвечающий 
 * за список навигационных элементов на странице поиска
 */
const SearchNavigation: FC = () => {
    return (
        <nav className="navlist secondary-nav">
            <ul className="navlist-items list-type-none ">
                {searchNavTitles.map((navTitle) =>
                    <NavigationItem 
                        navTitle={navTitle.text} 
                        index={navTitle.id} 
                        key={navTitle.id}/>
                )}
            </ul>
        </nav>
    );
};

export default SearchNavigation;