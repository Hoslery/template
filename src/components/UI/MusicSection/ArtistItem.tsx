import React, { FC, useState } from "react";
import { IArtist, ITag } from "../../../types/types";
import TagsList from "./TagsList";

interface ArtistProps {
    id: number,
    artist: IArtist,
    artistTags: ITag[]
}

const ArtistItem: FC<ArtistProps> = ({id, artist, artistTags}) => {
    return (
        <li className={`music-artists-item ${id > 5 ? 'artist-bottom-row' : ''}`}>
            <div className="artist-info">
                <h3 className="artist-name">
                    <a href={artist.url} className="name-link">{artist.name}</a>
                </h3>
                <TagsList tags={artistTags}/>
                <div className="artist-photo">
                    <a href={artist.url}>
                        <img className="avatar" src={artist.image[3]["#text"]} alt={`Avatar for ${artist.name}`}/> 
                    </a>
                </div>
            </div>
        </li>
    );
};

export default ArtistItem;