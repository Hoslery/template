import React, { FC, useState } from "react";
import {ITag, ITrack } from "../../../types/types";
import TagsList from "./TagsList";

interface TrackProps {
    track: ITrack,
    trackTags: ITag[]
}

/**
 * Функциональный компонент, отвечающий за трек в списке Популярных треков
 */
const TrackItem: FC<TrackProps> = ({track, trackTags}) => {
    return (
        <li className="column-tracks-item">
            <div className="artist-cover">
                <img className="cover" src={track.image[3]["#text"]} alt={track.name}/>
            </div>
            <div className="track-info">
                <h3 className="track-name">
                    <a href={track.url} className="name-link">{track.name}</a>
                </h3>
                <p className="track-artist"> 
                    <a href={track.artist.url} className="name-link">{track.artist.name}</a>
                </p>
                <TagsList tags={trackTags} width='auto'/>
            </div>
        </li>
    );
};

export default TrackItem;