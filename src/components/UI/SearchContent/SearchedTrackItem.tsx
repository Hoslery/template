import React, {FC} from "react";
import { IInfo } from "../../../types/types";
import { millisToMinutesAndSeconds } from "../../../utils/trackDuration";

interface TrackItemProps {
    track: IInfo,
    duration: number,
}

const SearchedTrackItem: FC<TrackItemProps> = ({track, duration}) => {
    const artist_url = track.url.substring(0,track.url.lastIndexOf('/') - 2);
    let time = "";
    if(duration != 0 )
        time = millisToMinutesAndSeconds(duration!!);

    return (
        <tr className="tracklist-row">
            <td className="tracklist-play"> 
                <a className="tracklist-play-button name-link">  
                </a>
            </td>
            <td className="tracklist-image">
                <a href={track.url} className="cover-art name-link">
                    <img src={track.image[3]["#text"]} alt={track.name}/>
                </a>
            </td>
            <td className="tracklist-loved">   
                <a className="tracklist-love-button name-link">
                </a>
            </td>
            <td className="tracklist-name">
                <a className="name-link" href={track.url} title={track.name}>{track.name}</a>
            </td>
            <td className="tracklist-artist">
                <a className="name-link" href={artist_url} title={track.artist}>{track.artist}</a>
            </td>
            <td className="tracklist-duration">
                {time}
            </td>
        </tr>  
    );
};

export default SearchedTrackItem;