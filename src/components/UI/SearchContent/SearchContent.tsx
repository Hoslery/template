import React, { FC, useState, useEffect} from "react";
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

const SearchContent: FC<SearchContentProps> = ({changeValue}) => {
    const [searchInfo, setSearchInfo] = useState<string>(localStorage.getItem("value") || '') 

    const search = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement> ) => {
        if (e.nativeEvent instanceof KeyboardEvent && e.nativeEvent.key !== "Enter") {
            return
        }
        if(searchInfo === '')
            return
        changeValue(searchInfo)
        if (typeof fetchSearchedArtists === 'function' && 
            typeof fetchSearchedAlbums === 'function' &&
            typeof fetchSearchedTracks === 'function'){
            fetchSearchedArtists(searchInfo)
            fetchSearchedAlbums(searchInfo)
            fetchSearchedTracks(searchInfo)
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

    useEffect(() => {
        if (typeof fetchSearchedArtists === 'function' && 
            typeof fetchSearchedAlbums === 'function' &&
            typeof fetchSearchedTracks === 'function'){
            fetchSearchedArtists(searchInfo)
            fetchSearchedAlbums(searchInfo)
            fetchSearchedTracks(searchInfo)
        }
    }, [])

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
                    value={searchInfo} onChange={e => setSearchInfo(e.target.value)}
                />
                <button className="search-reset button-set" type="reset" onClick={() => setSearchInfo('')}></button>
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