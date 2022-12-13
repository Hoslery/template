"use strict";
// @ts-ignore
const $hotRightNowList = document.querySelector('.music-artists');
const $popularTracksList = document.querySelector('.column-tracks');
const apiRoot = "http://ws.audioscrobbler.com/2.0/";
const apiKey = "80bd75ebdb197778667b6757f51d855d";
/**
 * Добавляет популярных артистов в пользовательский интерфейс
 * @param {Artist} artist - Артист
 * @returns {void} ничего не возвращает
 */
function addHotArtistToUI(artist) {
    const template = `
    <li class="music-artists-item ${artist.id > 5 ? 'artist-bottom-row' : ''}">
        <div class="artist-info">
            <h3 class="artist-name">
                <a href=${artist.url} class="name-link">${artist.name}</a>
            </h3>
            <section class="close-tags">
                <ul class="tags-list">
                    <li class="tag-item">
                        <a class="tag name-link" href=${artist.tags[0].url} title=${artist.tags[0].name}>${artist.tags[0].name}</a>
                    </li>
                    <li class="tag-item">
                        <a class="tag name-link" href=${artist.tags[1].url} title=${artist.tags[1].name}>${artist.tags[1].name}</a>
                    </li>
                    <li class="tag-item">
                        <a class="tag name-link" href=${artist.tags[2].url} title=${artist.tags[2].name}>${artist.tags[2].name}</a>
                    </li>
                </ul>
            </section>
            <div class="artist-photo">
                <a href=${artist.url}>
                <img class="avatar" src=${artist.image[3]["#text"]} alt="Avatar for ${artist.name}"> 
                </a>
            </div>
        </div>
    </li>
    `;
    $hotRightNowList.insertAdjacentHTML('beforeend', template);
}
/**
 * Добавляет популярные треки в пользовательский интерфейс
 * @param {Track} track - Трек
 * @returns {void} ничего не возвращает
 */
function addPopularTrackToUI(track) {
    const template = `
    <li class="column-tracks-item">
        <div class="artist-cover">
            <img class="cover" src=${track.image[3]["#text"]} alt=${track.name}>
        </div>
        <div class="track-info">
            <h3 class="track-name">
                <a href=${track.url} class="name-link">${track.name}</a>
            </h3>
            <p class="track-artist"> 
                <a href=${track.artist.url} class="name-link">${track.artist.name}</a>
            </p>
            <section class="close-tags">
                <ul class="tags-list" style="width: auto;">
                    <li class="tag-item">
                        <a class="tag name-link" href=${track.tags[0].url} title=${track.tags[0].name}>${track.tags[0].name}</a>
                    </li>
                    <li class="tag-item">
                        <a class="tag name-link" href=${track.tags[1].url} title=${track.tags[1].name}>${track.tags[1].name}</a>
                    </li>
                    <li class="tag-item">
                        <a class="tag name-link" href=${track.tags[2].url} title=${track.tags[2].name}>${track.tags[2].name}</a>
                    </li>
                </ul>
            </section>
        </div>
    </li>
    `;
    $popularTracksList.insertAdjacentHTML('beforeend', template);
}
/**
 * Извлекает популярных артистов в настоящее время
 * @async
 * @api GET method=chart.gettopartists
 * @returns {Artist[]} Массив артистов
 */
async function fetchHotArtists() {
    const response = await fetch(apiRoot + `?method=chart.gettopartists&page=1&limit=12&api_key=${apiKey}&format=json`);
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.message);
    }
    return data.artists.artist;
}
/**
 * Извлекает популярные треки в настоящее время
 * @async
 * @api GET method=chart.gettoptracks
 * @returns {Track[]} Массив треков
 */
async function fetchPopularTracks() {
    const response = await fetch(apiRoot + `?method=chart.gettoptracks&page=1&limit=12&api_key=${apiKey}&format=json`);
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.message);
    }
    return data.tracks.track;
}
/**
 * Извлекает 3 лучших тега, связанных с заданным артистом
 * @async
 * @param {String} name - Псевдоним артиста
 * @api GET method=artist.gettoptags
 * @returns {Tag[]} Массив тегов
 */
async function fetchTagsByArtistName(name) {
    const response = await fetch(apiRoot + `?method=artist.gettoptags&artist=${name}&api_key=${apiKey}&format=json`);
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.message);
    }
    return data.toptags.tag.slice(0, 3);
}
/**
 * Извлекает 3 лучших тега, связанных с данным треком исполнителя
 * @async
 * @param {String} track - Название трека
 * @param {String} artist - Псевдоним артиста
 * @api GET method=track.gettoptags
 * @returns {Tag[]} Массив тегов
 */
async function fetchTagsByTrack(track, artist) {
    const response = await fetch(apiRoot + `?method=track.gettoptags&artist=${artist}&track=${track}&api_key=${apiKey}&format=json`);
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.message);
    }
    return data.toptags.tag.slice(0, 3);
}
/**
 * Обработчик ошибок
 * @param {String} e - Строка с ошибкой
 * @param {boolean} mesForUser - Параметр, отвечающий за необходимость вывода диалогового окна с ошибкой пользователю
 * @returns {void} ничего не возвращает.
 */
function handlerErrors(e, mesForUser = true) {
    console.error(e);
    if (mesForUser)
        alert("Извините, возникла ошибка!");
}
/**
 * Основная функция, содержащая и обрабатывающая результаты запрсов
 * @async
 * @returns {void} ничего не возвращает.
 */
async function main() {
    const hotArtists = await fetchHotArtists().catch(handlerErrors);
    if (typeof hotArtists !== 'object') {
        return;
    }
    const artistTags = await Promise.all(hotArtists.map(async (hotArtist) => await fetchTagsByArtistName(hotArtist.name).catch((error) => handlerErrors(error, false))));
    artistTags.some((tag, i) => {
        if (typeof tag !== 'object') {
            alert("Извините, возникла ошибка!");
            return true;
        }
        const hotArtist = hotArtists[i];
        hotArtist.id = i;
        hotArtist.tags = tag;
        addHotArtistToUI(hotArtist);
    });
    const popularTracks = await fetchPopularTracks().catch(handlerErrors);
    if (typeof popularTracks !== 'object') {
        return;
    }
    const tracksTags = await Promise.all(popularTracks.map(async (popularTrack) => await fetchTagsByTrack(popularTrack.name, popularTrack.artist.name).catch((error) => handlerErrors(error, false))));
    tracksTags.some((tag, i) => {
        if (typeof tag !== 'object') {
            alert("Извините, возникла ошибка!");
            return true;
        }
        const popularTrack = popularTracks[i];
        popularTrack.tags = tag;
        addPopularTrackToUI(popularTrack);
    });
}
main();
