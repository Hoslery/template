import React, {FC} from "react";
import { Link } from "react-router-dom";
import { IArtist, IInfo, ISimpleList } from "../../../types/types";
import SearchedAlbumItem from "./SearchedAlbumItem";
import SearchedArtistItem from "./SearchedArtistItem";
import SearchedInfoList from "./SearchedInfoList";
import TracksTable from "./TracksTable";

interface AlbumsSectionProps {
    heading: string,
    albums: IInfo[],
}

/**
 * Функциональный компонент, отвечающий за альбомы на странице поиска
 */
const SearchedAlbumsSection: FC<AlbumsSectionProps> = ({heading, albums}) => {
    return (
        <section className="search-info-section">
            <h2 className="search-heading">
                <Link to="/popular" className="name-link">
                    {heading}
                </Link>
            </h2>                
            <SearchedInfoList items={albums} renderItem={(album: IInfo) => <SearchedAlbumItem album={album} key={album.url}/>}/>           
            <p className="more-link">
                <Link className="more-link-link" to="/popular">More {heading.toLowerCase()}</Link>
            </p>
            <p className="message hide">No {heading.toLowerCase()} found.</p>
        </section>
    );
};

export default React.memo(SearchedAlbumsSection);