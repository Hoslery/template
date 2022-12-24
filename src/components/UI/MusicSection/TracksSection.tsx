import React, { FC, useState } from "react";
import {ITag, ITrack } from "../../../types/types";
import TrackItem from "./TrackItem";

interface TracksSectionProps {
    tracks: ITrack[]
    tracksTags: ITag[][]
}

/**
 * Функциональный компонент, отвечающий за список популярных треков
 */
const TracksSection: FC<TracksSectionProps> = ({tracks, tracksTags}) => {
    return (
        <div className="container page-content">
            <section className="music-section" id="popular-tracks">
                <h2 className="music-section-heading">Popular tracks</h2>
                <ol className="column-tracks list-type-none">
                    {tracks.map((track, index) => 
                        <TrackItem
                            track={track} 
                            trackTags={tracksTags[index]}
                            key={index} 
                        />
                    )}
                </ol>
            </section>
        </div>
    );
};

export default TracksSection;