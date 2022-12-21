import { IArtist, IInfo, ITag, ITrack } from "../types/types";
import { apiKey, apiRoot, methods } from "../utils/constants";


export default class Api {

    /**
     * Извлекает популярных артистов в настоящее время
     * @async
     * @api GET method=chart.gettopartists
     * @returns {IArtist[]} Массив артистов
     */
    static async getTopArtists(limit = 12, page = 1) {
        const response = await fetch(apiRoot + `?method=${methods.TopArtists}&page=${page}&limit=${limit}&api_key=${apiKey}&format=json`);
        const data = await response.json();
        if (!response.ok) {
            console.error(data.message)
            throw new Error(data.message);
        }
        return data.artists.artist as IArtist[];
    }

    /**
     * Извлекает 3 лучших тега, связанных с заданным артистом
     * @async
     * @param {String} name - Псевдоним артиста
     * @api GET method=artist.gettoptags
     * @returns {ITag[]} Массив тегов
     */
    static async getTagsByArtist(name: string) {
        const response = await fetch(apiRoot + `?method=${methods.TopTagsByArtist}&artist=${name}&api_key=${apiKey}&format=json`);
        const data = await response.json();
        if (!response.ok) {
            console.error(data.message)
            throw new Error(data.message);
        }
        return data.toptags.tag.slice(0,3) as ITag[];
    }

    /**
     * Извлекает популярные треки в настоящее время
     * @async
     * @api GET method=chart.gettoptracks
     * @returns {ITrack[]} Массив треков
     */
    static async getPopularTracks(limit = 12, page = 1) {
        const response = await fetch(apiRoot + `?method=${methods.TopTracks}&page=${page}&limit=${limit}&api_key=${apiKey}&format=json`);
        const data = await response.json();
        if (!response.ok) {
            console.error(data.message)
            throw new Error(data.message);
        }
        return data.tracks.track as ITrack[];
    }

    /**
     * Извлекает 3 лучших тега, связанных с данным треком исполнителя
     * @async
     * @param {String} track - Название трека
     * @param {String} artist - Псевдоним артиста
     * @api GET method=track.gettoptags
     * @returns {ITag[]} Массив тегов
     */
    static async getTagsByTrack(track: string, artist: string) {
        if(track.includes('&'))
            return []
        const response = await fetch(apiRoot + `?method=${methods.TopTagsByTrack}&artist=${artist}&track=${track}&api_key=${apiKey}&format=json`);
        const data = await response.json();
        if (!response.ok) {
            console.error(data.message)
            throw new Error(data.message);
        }
        return data.toptags.tag.slice(0,3) as ITag[];
    }

    /**
     * Возвращает артистов, соответствующих значению, введенному в поле поиска
     * @async
     * @param {String} value - Значение введенное в поле поиска
     * @param {Number} limit - Количество результатов для выборки на страницу
     * @param {Number} page - Номер страницы для извлечения
     * @api GET method=artist.search
     * @returns {IArtist[]} Массив артистов
     */
    static async getArtistsBySearchValue(value: string, limit = 8, page = 1) {
        const response = await fetch(apiRoot + `?method=${methods.ArtistsBySearchValue}&artist=${value}&page=${page}&limit=${limit}&api_key=${apiKey}&format=json`);
        const data = await response.json();
        if (!response.ok) {
            console.error(data.message)
            throw new Error(data.message);
        }
        return data.results.artistmatches.artist as IArtist[];
    }

    /**
     * Возвращает альбомы, соответствующие значению, введенному в поле поиска
     * @async
     * @param {String} value - Значение введенное в поле поиска
     * @param {Number} limit - Количество результатов для выборки на страницу
     * @param {Number} page - Номер страницы для извлечения
     * @api GET method=album.search
     * @returns {IInfo[]} Массив альбомов
     */
    static async getAlbumsBySearchValue(value: string, limit = 8, page = 1) {
        const response = await fetch(apiRoot + `?method=${methods.AlbumsBySearchValue}&album=${value}&page=${page}&limit=${limit}&api_key=${apiKey}&format=json`);
        const data = await response.json();
        if (!response.ok) {
            console.error(data.message)
            throw new Error(data.message);
        }
        return data.results.albummatches.album as IInfo[];
    }

    /**
     * Возвращает треки, соответствующие значению, введенному в поле поиска
     * @async
     * @param {String} value - Значение введенное в поле поиска
     * @param {Number} limit - Количество результатов для выборки на страницу
     * @param {Number} page - Номер страницы для извлечения
     * @api GET method=track.search
     * @returns {IInfo[]} Массив треков
     */
    static async getTracksBySearchValue(value: string, limit = 10, page = 1) {
        const response = await fetch(apiRoot + `?method=${methods.TracksBySearchValue}&track=${value}&page=${page}&limit=${limit}&api_key=${apiKey}&format=json`);
        const data = await response.json();
        if (!response.ok) {
            console.error(data.message)
            throw new Error(data.message);
        }
        return data.results.trackmatches.track as IInfo[];
    }

    /**
     * Возвращает длительность трека в миллисекундах
     * @async
     * @param {String} track - Название трека
     * @param {String} artist - Псевдоним артиста
     * @api GET method=track.getInfo
     * @returns {Number} Длительность трека
     */
    static async getAdditionalInfoAboutTrack(track: string, artist: string) {
        const response = await fetch(apiRoot + `?method=${methods.AdditionalInfoAboutTrack}&api_key=${apiKey}&artist=${artist}&track=${track}&format=json`);
        const data = await response.json();
        if (!response.ok) {
            console.error(data.message)
            throw new Error(data.message);
        }
        if(typeof data.track?.duration === 'undefined')
            return 0;
        else 
            return parseInt(data.track.duration);
    }
}