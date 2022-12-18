import React, {FC} from "react";
import { Link } from "react-router-dom";
import { IArtist, IInfo, ISimpleList } from "../../../types/types";
import SearchedArtistItem from "./SearchedArtistItem";
import SearchedInfoList from "./SearchedInfoList";
import TracksTable from "./TracksTable";

interface ArtistsSectionProps {
    heading: string,
    artists: IArtist[],
}

const SearchedArtistsSection: FC<ArtistsSectionProps> = ({heading, artists}) => {
    return (
        <section className="search-info-section">
            <h2 className="search-heading">
                <Link to="/popular" className="name-link">
                    {heading}
                </Link>
            </h2>                
            <SearchedInfoList items={artists} renderItem={(artist: IArtist) => <SearchedArtistItem artist={artist} key={artist.url}/>}/>           
            <p className="more-link">
                <Link className="more-link-link" to="/popular">More {heading.toLowerCase()}</Link>
            </p>
            <p className="message hide">No {heading.toLowerCase()} found.</p>
        </section>
    );
};

export default SearchedArtistsSection;