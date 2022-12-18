import React, {FC} from "react";
import { IArtist, IInfo } from "../../../types/types";

interface AlbumItemProps {
    album: IInfo
}

const SearchedAlbumItem: FC<AlbumItemProps> = ({album}) => {
    const artist_url = album.url.substring(0,album.url.lastIndexOf('/'));

    return (
        <li className="grid-item">
            <div className="grid-item-cover link-block">
                <div className="grid-item-cover-image">
                    <img src={album.image[3]["#text"]} alt={`Image for '${album.name}'`}/>
                </div>
                <div className="grid-item-details">
                    <p className="grid-item-main-text">
                        <a className="name-link" href={album.url}>{album.name}</a>
                    </p>
                    <p className="grid-item-aux-text">
                        <a className="name-link" href={artist_url}>{album.artist}</a>     
                    </p>
                </div>
                <a href={album.url} className="link-block-cover-link"></a>
                
            </div>       
        </li> 
    );
};

export default SearchedAlbumItem;