import { useState } from "react";

/**
 * Кастомный хук для работы с запросами на сервер,
 * обработкой ошибок и отслеживанием состояния загрузки данных.
 * Возвращает массив из
 * 1.Асинхронной функции, вызываюшей callback и возвращающей Promise
 * 2.Состоянием загрузки данных на текущий момент времени
 * 3.Сообщение об ошибке, если она возникла
 * @param callback 
 */
export const useFetching = (callback: (...args: any[]) => void) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async (...args: any[]) => {
        try {
            setIsLoading(true);
            await callback(...args);
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setIsLoading(false);
        }
    }

    return [fetching, isLoading, error]
}