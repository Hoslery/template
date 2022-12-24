import React, {FC} from "react";
import { Link } from "react-router-dom";
import { IArtist, IInfo, ISimpleList } from "../../../types/types";
import SearchedAlbumItem from "./SearchedAlbumItem";
import SearchedArtistItem from "./SearchedArtistItem";
import SearchedInfoList from "./SearchedInfoList";
import TracksTable from "./TracksTable";

interface TracksSectionProps {
    heading: string,
    tracks: IInfo[],
    durations: number[]
}

/**
 * Функциональный компонент, отвечающий за треки на странице поиска
 */
const SearchedTracksSection: FC<TracksSectionProps> = ({heading, tracks, durations}) => {
    return (
        <section className="search-info-section">
            <h2 className="search-heading">
                <Link to="/popular" className="name-link">
                    {heading}
                </Link>
            </h2>                
            <TracksTable tracks={tracks} durations={durations}/>         
            <p className="more-link">
                <Link className="more-link-link" to="/popular">More {heading.toLowerCase()}</Link>
            </p>
            <p className="message hide">No {heading.toLowerCase()} found.</p>
        </section>
    );
};

export default React.memo(SearchedTracksSection);