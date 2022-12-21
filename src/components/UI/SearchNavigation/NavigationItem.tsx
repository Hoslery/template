import React, { FC } from "react";
import { Link } from "react-router-dom";

interface NavigationItemProps {
    navTitle: string,
    index: number
}

/**
 * Функциональный компонент, отвечающий за элемент
 * в списке навигации на странице поиска
 */
const NavigationItem: FC<NavigationItemProps> = ({navTitle, index}) => {
    const linkClass = `secondary-nav-item-link name-link 
       ${index === 1 ? 'secondary-nav-item-link--active' : ''}`

    return (
        <li className="navlist-item secondary-nav-item">
            <Link className={linkClass} to="/search">
                {navTitle}
            </Link>
        </li>
    );
};

export default NavigationItem;