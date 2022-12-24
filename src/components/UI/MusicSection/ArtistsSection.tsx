import React, { FC, useState } from "react";
import { IArtist, ITag } from "../../../types/types";
import ArtistItem from "./ArtistItem";

interface ArtistsSectionProps {
    artists: IArtist[]
    artistsTags: ITag[][]
}

/**
 * Функциональный компонент, отвечающий за список популярных артистов
 */
const ArtistsSection: FC<ArtistsSectionProps> = ({artists, artistsTags}) => {
    return (
        <div className="container page-content">
            <section className="music-section" id="hot-right-now">
                <h2 className="music-section-heading">Hot right now</h2>
                <ol className="music-artists list-type-none">
                    {artists.map((artist, index) => 
                        <ArtistItem 
                            id={index} 
                            artist={artist} 
                            artistTags={artistsTags[index]}
                            key={index} 
                        />
                    )}
                </ol>
            </section>
        </div>
    );
};

export default ArtistsSection;