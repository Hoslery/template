import React, { FC, useState, useEffect, useRef} from "react";
import Api from "../../../API/Api";
import { useFetching } from "../../../hooks/useFetching";
import { IArtist, IInfo } from "../../../types/types";
import Loader from "../Loader/Loader";
import SearchedAlbumsSection from "./SearchedAlbumsSection";
import SearchedArtistsSection from "./SearchedArtistsSection";
import SearchedTracksSection from "./SearchedTracksSection";

interface SearchContentProps {
    changeValue: (value: string) => void
}

/**
 * Функциональный компонент, отвечающий за ключевой контент на странице поиска
 */
const SearchContent: FC<SearchContentProps> = ({changeValue}) => {
    const searchInfo = useRef<HTMLInputElement>(null);

    /**
     * Функция, отвечающая за поиск артистов/альбомов/треков,
     * при нажатии на иконку поиска или 'Enter' в поле поиска
     * @param e
     */
    const search = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement> ) => {
        if (e.nativeEvent instanceof KeyboardEvent && e.nativeEvent.key !== "Enter") {
            return
        }
        if(searchInfo.current!!.value === '')
            return
        changeValue(searchInfo.current!!.value)
        if (typeof fetchSearchedArtists === 'function' && 
            typeof fetchSearchedAlbums === 'function' &&
            typeof fetchSearchedTracks === 'function'){
            fetchSearchedArtists(searchInfo.current!!.value)
            fetchSearchedAlbums(searchInfo.current!!.value)
            fetchSearchedTracks(searchInfo.current!!.value)
        }
    }

    const [artists, setArtists] = useState<IArtist[]>([]);
    const [albums, setAlbums] = useState<IInfo[]>([]);
    const [tracks, setTracks] = useState<IInfo[]>([]);
    const [durations, setDurations] = useState<number[]>([]);

    const [fetchSearchedArtists, isArtistsLoading, artistError] = useFetching(async (value: string) => {
        const searchedArtists = await Api.getArtistsBySearchValue(value);
        setArtists(searchedArtists);
    })

    const [fetchSearchedAlbums, isAlbumsLoading, albumError] = useFetching(async (value: string) => {
        const searchedAlbums = await Api.getAlbumsBySearchValue(value);
        setAlbums(searchedAlbums);
    })

    const [fetchSearchedTracks, isTracksLoading, trackError] = useFetching(async (value: string) => {
        const searchedTracks = await Api.getTracksBySearchValue(value);
        setTracks(searchedTracks);
    })

    const [fetchTracksDuration, isTracksDurationLoading, trackDurationError] = useFetching(async() => {
        const tracksDuration = await Promise.all(tracks.map(async (track: IInfo) => 
            await Api.getAdditionalInfoAboutTrack(track.name, track.artist)
        ));
        setDurations(tracksDuration)
    })

    /**
     * Получение данных из API при монтировании компонента и обновление состояний артистов/альбомов/треков
     */
    useEffect(() => {
        if (typeof fetchSearchedArtists === 'function' && 
            typeof fetchSearchedAlbums === 'function' &&
            typeof fetchSearchedTracks === 'function'){
            fetchSearchedArtists(localStorage.getItem("value") || ' ')
            fetchSearchedAlbums(localStorage.getItem("value") || ' ')
            fetchSearchedTracks(localStorage.getItem("value") || ' ')
        }
    }, [])

    /**
     * Получение данных из API при монтировании компонента
     * (и при изменении состояния треков) и обновление состояния -  длительность треков
     */
    useEffect(() => {
        if (typeof fetchTracksDuration === 'function') {
            fetchTracksDuration()
        }
    }, [tracks])

    return (
        <div className="col-main">
            <div className="content-search" onKeyUp={search}>
                <input 
                    id="searchInfo" className="search-field"
                    type="text" placeholder="Search for music…" 
                    ref={searchInfo}
                />
                <button className="search-reset button-set" type="reset" onClick={() => searchInfo.current!!.value = ''}></button>
                <button className="search-submit button-set" type="submit" onClick={search}></button>
            </div>
            {artistError || albumError || trackError || trackDurationError 
                ? <h1 className="heading">Извините, произошла ошибка!</h1>
                : ''
            }
            {isArtistsLoading || isAlbumsLoading || isTracksLoading
                ? <Loader/>
                : <div>
                    <SearchedArtistsSection heading='Artists' artists={artists}/>
                    <SearchedAlbumsSection heading='Albums' albums={albums}/>
                    <SearchedTracksSection heading='Tracks' tracks={tracks} durations={durations}/>
                </div>
            }
        </div>
    );
};

export default SearchContent;