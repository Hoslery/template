"use strict";
// @ts-ignore
const $searchInput = document.querySelector('.search-field');
const $searchBtn = document.querySelector('.search-submit');
const $resetBtn = document.querySelector('.search-reset');
const $artistsOrAlbums = document.querySelectorAll('.grid-items');
const $trackTable = document.querySelector('.tracklist');
const $moreLink = document.querySelectorAll('.more-link');
const $moreLinkLink = document.querySelectorAll('.more-link-link');
const $secondarySectionLink = document.querySelectorAll('.secondary-nav-item-link');
const $infoSection = document.querySelectorAll('.search-info-section');
const $notFoundMes = document.querySelectorAll('.message');
const $heading = document.querySelector('.content-top-header');
const apiRoot1 = "http://ws.audioscrobbler.com/2.0/";
const apiKey1 = "80bd75ebdb197778667b6757f51d855d";
$resetBtn.addEventListener('click', (event) => {
    $searchInput.value = "";
});
/**
 * Обработчик ошибок
 * @param {String} e - Строка с ошибкой
 * @param {boolean} mesForUser - Параметр, отвечающий за необходимость вывода диалогового окна с ошибкой пользователю
 * @returns {void} ничего не возвращает.
 */
function handlerSearchErrors(e, mesForUser = true) {
    console.error(e);
    if (mesForUser)
        alert("Извините, возникла ошибка!");
}
/**
 * Функция, содержащая и обрабатывающая результаты запросов
 * @async
 * @returns {void} ничего не возвращает
 */
async function dataProcessing() {
    const [artists, albums] = await Promise.all([
        await fetchArtistsBySearchValue($searchInput.value).catch(handlerSearchErrors),
        await fetchAlbumsBySearchValue($searchInput.value).catch(handlerSearchErrors)
    ]);
    if (typeof artists !== 'object' || typeof albums !== 'object') {
        return;
    }
    $artistsOrAlbums[0].innerHTML = "";
    $artistsOrAlbums[1].innerHTML = "";
    $trackTable.tBodies[0].innerHTML = "";
    const replaceValue = $searchInput.value.replaceAll(' ', '+');
    $moreLinkLink[0].setAttribute("href", `https://www.last.fm/search/artists?q=${replaceValue}`);
    $moreLinkLink[1].setAttribute("href", `https://www.last.fm/search/albums?q=${replaceValue}`);
    $moreLinkLink[2].setAttribute("href", `https://www.last.fm/search/tracks?q=${replaceValue}`);
    $secondarySectionLink[1].setAttribute("href", `https://www.last.fm/search/artists?q=${replaceValue}`);
    $secondarySectionLink[2].setAttribute("href", `https://www.last.fm/search/albums?q=${replaceValue}`);
    $secondarySectionLink[3].setAttribute("href", `https://www.last.fm/search/tracks?q=${replaceValue}`);
    artists.forEach((artist) => {
        addSearchArtistToUI(artist);
    });
    albums.forEach((album) => {
        addSearchAlbumToUI(album);
    });
    const tracks = await fetchTracksBySearchValue($searchInput.value).catch(handlerSearchErrors);
    if (typeof tracks !== 'object') {
        return;
    }
    if (artists.length == 0 && albums.length == 0 && tracks.length == 0) {
        $moreLink.forEach((link, i) => {
            link.classList.add('hide');
            $notFoundMes[i].classList.remove('hide');
            $heading.innerHTML = `<strong>Search results for “${$searchInput.value}”</strong>`;
        });
        return;
    }
    else {
        $moreLink.forEach((link, i) => {
            link.classList.remove('hide');
            $notFoundMes[i].classList.add('hide');
        });
    }
    const tracksDuration = await Promise.all(tracks.map(async (track) => await fetchAdditionalInfoAboutTrack(track.name, track.artist).catch((error) => handlerSearchErrors(error, false))));
    tracksDuration.some((duration, i) => {
        if (typeof duration !== 'number') {
            alert("Извините, возникла ошибка!");
            return true;
        }
        const track = tracks[i];
        track.duration = duration;
        addSearchTrackToUI(track);
    });
}
/**
 * Обработчик(в виде функции), который вызывается, когда пользователь нажимает на кнопку "Enter"
 * в поле поиска, либо на кнопку "Поиск"
 * @param {MyEvent} event - Событие
 * @returns {void} ничего не возвращает
 */
const handler = (event) => {
    if ($searchInput.value == "") {
        return;
    }
    if (event instanceof KeyboardEvent && event.key != 'Enter') {
        return;
    }
    localStorage.setItem("searchInfo", $searchInput.value);
    $searchInput.setAttribute("value", `${$searchInput.value}`);
    $heading.innerHTML = `<strong>Search results for “${$searchInput.value}”</strong>`;
    dataProcessing();
};
$searchBtn.addEventListener('click', handler);
$searchInput.addEventListener('keyup', handler);
/**
 * Добавляет информацию о найденном артисте в пользовательский интерфейс
 * @param {Artist} artist - Информация о найденном артисте
 * @returns {void} ничего не возвращает
 */
function addSearchArtistToUI(artist) {
    const template = `
    <li class="grid-item">
        <div class="grid-item-cover link-block">

            <div class="grid-item-cover-image">
                <img src=${artist.image[4]["#text"]} alt="Image for '${artist.name}'">
            </div>

            <div class="grid-item-details">
                <p class="grid-item-main-text">
                    <a class="name-link" href=${artist.url}>${artist.name}</a>
                </p>
                <p class="grid-item-aux-text">
                    ${artist.listeners} listeners    
                </p>
            </div>

            <a href=${artist.url} class="link-block-cover-link"></a>
            
        </div>       
    </li>
    `;
    $artistsOrAlbums[0].insertAdjacentHTML('beforeend', template);
}
/**
 * Добавляет информацию о найденном альбоме в пользовательский интерфейс
 * @param {Info} album - Информация о найденном альбоме
 * @returns {void} ничего не возвращает
 */
function addSearchAlbumToUI(album) {
    const artist_url = album.url.substring(0, album.url.lastIndexOf('/'));
    const template = `
    <li class="grid-item">
        <div class="grid-item-cover link-block">

            <div class="grid-item-cover-image">
                <img src=${album.image[3]["#text"]} alt="Image for '${album.name}'">
            </div>

            <div class="grid-item-details">
                <p class="grid-item-main-text">
                    <a class="name-link" href=${album.url}>${album.name}</a>
                </p>
                <p class="grid-item-aux-text">
                    <a class="name-link" href=${artist_url}>${album.artist}</a>     
                </p>
            </div>

            <a href=${album.url} class="link-block-cover-link"></a>
            
        </div>       
    </li>    
    `;
    $artistsOrAlbums[1].insertAdjacentHTML('beforeend', template);
}
/**
 * Добавляет информацию о найденном треке в пользовательский интерфейс
 * @param {Info} track - Информация о найденном треке
 * @returns {void} ничего не возвращает
 */
function addSearchTrackToUI(track) {
    const artist_url = track.url.substring(0, track.url.lastIndexOf('/') - 2);
    let time = "";
    if (track.duration != 0)
        time = millisToMinutesAndSeconds(track.duration);
    const template = `
    <tr class="tracklist-row">
        <td class="tracklist-play"> 
            <a class="tracklist-play-button name-link">  
            </a>
        </td>

        <td class="tracklist-image">
            <a href=${track.url} class="cover-art name-link">
                <img src=${track.image[3]["#text"]} alt=${track.name}>
            </a>
        </td>

        <td class="tracklist-loved">   
            <a class="tracklist-love-button name-link">
            </a>
        </td>

        <td class="tracklist-name">
            <a class="name-link" href=${track.url} title=${track.name}>${track.name}</a>
        </td>

        <td class="tracklist-artist">
            <a class="name-link" href=${artist_url} title=${track.artist}>${track.artist}</a>
        </td>

        <td class="tracklist-duration">
            ${time}
        </td>
    </tr>   
    `;
    $trackTable.tBodies[0].insertAdjacentHTML('beforeend', template);
}
/**
 * Возвращает артистов, соответствующих значению, введенному в поле поиска
 * @async
 * @param {String} value - Значение введенное в поле поиска
 * @api GET method=artist.search
 * @returns {Artist[]} Массив артистов
 */
async function fetchArtistsBySearchValue(value) {
    const response = await fetch(apiRoot1 + `?method=artist.search&artist=${value}&page=1&limit=8&api_key=${apiKey1}&format=json`);
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.message);
    }
    return data.results.artistmatches.artist;
}
/**
 * Возвращает альбомы, соответствующие значению, введенному в поле поиска
 * @async
 * @param {String} value - Значение введенное в поле поиска
 * @api GET method=album.search
 * @returns {Info[]} Массив альбомов
 */
async function fetchAlbumsBySearchValue(value) {
    const response = await fetch(apiRoot1 + `?method=album.search&album=${value}&page=1&limit=8&api_key=${apiKey1}&format=json`);
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.message);
    }
    return data.results.albummatches.album;
}
/**
 * Возвращает треки, соответствующие значению, введенному в поле поиска
 * @async
 * @param {String} value - Значение введенное в поле поиска
 * @api GET method=track.search
 * @returns {Info[]} Массив треков
 */
async function fetchTracksBySearchValue(value) {
    const response = await fetch(apiRoot1 + `?method=track.search&track=${value}&page=1&limit=10&api_key=${apiKey1}&format=json`);
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.message);
    }
    return data.results.trackmatches.track;
}
/**
 * Возвращает длительность трека в миллисекундах
 * @async
 * @param {String} track - Название трека
 * @param {String} artist - Псевдоним артиста
 * @api GET method=track.getInfo
 * @returns {Number} Длительность трека
 */
async function fetchAdditionalInfoAboutTrack(track, artist) {
    var _a;
    const response = await fetch(apiRoot1 + `?method=track.getInfo&api_key=${apiKey1}&artist=${artist}&track=${track}&format=json`);
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.message);
    }
    if (typeof ((_a = data.track) === null || _a === void 0 ? void 0 : _a.duration) === 'undefined')
        return 0;
    else
        return parseInt(data.track.duration);
}
/**
 * Возвращает длительность трека в виде строки(в формате "минуты:секунды")
 * @param {Number} millis - Длительность трека в миллисекундах
 * @returns {String} возвращает строку
 */
function millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
/**
 * Возвращает value элемента по его id
 * @param {String} id - id элемента
 * @returns {String} возвращает строку
 */
function getSavedValue(id) {
    if (!localStorage.getItem(id)) {
        return "cake";
    }
    return localStorage.getItem(id);
}
/**
 * Функция, вызывающая обработку данных при открытии/обновлении страницы
 * @returns {void} ничего не возвращает
 */
function start() {
    $searchInput.value = getSavedValue("searchInfo");
    $heading.innerHTML = `<strong>Search results for “${$searchInput.value}”</strong>`;
    dataProcessing();
}
start();
