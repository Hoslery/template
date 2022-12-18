import React, { FC, useEffect, useState } from "react";
import Api from "../API/Api";
import Loader from "../components/UI/Loader/Loader";
import ArtistsSection from "../components/UI/MusicSection/ArtistsSection";
import TracksSection from "../components/UI/MusicSection/TracksSection";
import { useFetching } from "../hooks/useFetching";
import { IArtist, ITag, ITrack } from "../types/types";

const Popular: FC = () => {
    const [artists, setArtists] = useState<IArtist[]>([]);
    const [tagsArtist, setTagsArtist] = useState<ITag[][]>([]);
    const [tracks, setTracks] = useState<ITrack[]>([]);
    const [tagsTrack, setTagsTrack] = useState<ITag[][]>([]);

    const [fetchTopArtists, isArtistsLoading, artistError] = useFetching(async () => {
        const topArtists = await Api.getTopArtists();
        setArtists(topArtists);
    })

    const [fetchArtistTags, isArtistTagsLoading, artistTagsError] = useFetching(async() => {
        const artistTags = await Promise.all(artists.map(async (hotArtist: IArtist) =>
            await Api.getTagsByArtist(hotArtist.name)
        ));
        setTagsArtist(artistTags)
    })

    const [fetchTopTracks, isTracksLoading, trackError] = useFetching(async () => {
        const topTracks = await Api.getPopularTracks();
        setTracks(topTracks);
    })

    const [fetchTrackTags, isTrackTagsLoading, trackTagsError] = useFetching(async() => {
        const trackTags = await Promise.all(tracks.map(async (popularTrack: ITrack) => 
            await Api.getTagsByTrack(popularTrack.name, popularTrack.artist.name)
        ));
        setTagsTrack(trackTags)
    })
    

    useEffect(() => {
        if (typeof fetchTopArtists === 'function' && 
            typeof fetchTopTracks === 'function'){
            fetchTopArtists()
            fetchTopTracks()
        }
    }, [])

    useEffect(() => {
        if (typeof fetchArtistTags === 'function'){
            fetchArtistTags()
        }
    }, [artists])

    useEffect(() => {
        if (typeof fetchTrackTags === 'function'){
            fetchTrackTags()
        }
    }, [tracks])

    return (
        <main className="content">
            <h1 className="heading">Music</h1>
            {artistError || artistTagsError || trackError || trackTagsError 
                ? <h1 className="heading">Извините, произошла ошибка!</h1>
                : ''
            }
            {isArtistsLoading || 
             isArtistTagsLoading ||
             isTracksLoading || 
             isTrackTagsLoading
                ? <Loader/>
                :  <div>
                        <ArtistsSection artists={artists} artistsTags={tagsArtist}/>
                        <TracksSection tracks={tracks} tracksTags={tagsTrack}/>
                   </div>
                    
            }
        </main>
    );
};

export default Popular;