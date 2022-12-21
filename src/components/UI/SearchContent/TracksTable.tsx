import React, {FC} from "react";
import { IInfo } from "../../../types/types";
import SearchedTrackItem from "./SearchedTrackItem";

interface TracksTableProps {
    tracks: IInfo[],
    durations: number[]
}

/**
 * Функциональный компонент, отвечающий за таблицу треков
 */
const TracksTable: FC<TracksTableProps> = ({tracks, durations}) => {
    return (
        <table className="tracklist">
            <tbody>
                {tracks.map((track, index) => 
                    <SearchedTrackItem track={track} key={index} duration={durations[index]}/>
                )}
            </tbody>
        </table>
    );
};

export default TracksTable;