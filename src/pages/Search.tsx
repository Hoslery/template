import React, { FC, useState } from "react";
import ExtraInf from "../components/UI/ExtraInformation/ExtraInf";
import SearchContent from "../components/UI/SearchContent/SearchContent";
import SearchNavigation from "../components/UI/SearchNavigation/SearchNavigation";


/**
 * Функциональный компонент, отвечающий за отображение страницы поиска
 */
const Search: FC = () => {
    const [searchValue, setSearchValue] = useState<string>(localStorage.getItem("value") ||' ')

    /**
     * Функция, для изменения содержания результирующей строки при поиске
     * @param {String} value 
     */
    const changeValue = (value: string) => {
        setSearchValue(value)
        localStorage.setItem("value", value);
    }

    return (
        <main className="content">
            <div className="content-top">
                <div className="container content-top-pad">
                    <h1 className="content-top-header">
                        <strong>Search results for "{searchValue}"</strong>
                    </h1>
                    <SearchNavigation/>
                </div>
            </div>
            <div className="two-column-page">
                <div className="container page-content">
                    <div className="row">
                        <SearchContent changeValue={changeValue}/>
                        <ExtraInf/>
                    </div>
                </div>
            </div>
      </main>
    );
};

export default Search;