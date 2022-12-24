import React from "react";
import cl from './Loader.module.css'

/**
 * Функциональный компонент, отвечающий за отображение загрузки 
 */
const Loader = () => {
    return (
        <div className={cl.container}>
            <div className={cl.loading}></div>
        </div>   
    );
};

export default Loader;