import React, {FC} from "react";
import { IArtist } from "../../../types/types";

interface ArtistItemProps {
    artist: IArtist
}

const SearchedArtistItem: FC<ArtistItemProps> = ({artist}) => {
    return (
        <li className="grid-item">
            <div className="grid-item-cover link-block">
                <div className="grid-item-cover-image">
                    <img src={artist.image[4]["#text"]} alt={`Image for '${artist.name}'`}/>
                </div>
                <div className="grid-item-details">
                    <p className="grid-item-main-text">
                        <a className="name-link" href={artist.url}>{artist.name}</a>
                    </p>
                    <p className="grid-item-aux-text">
                        {artist.listeners} listeners    
                    </p>
                </div>
                <a href={artist.url} className="link-block-cover-link"></a> 
            </div>       
        </li>
    );
};

export default SearchedArtistItem;