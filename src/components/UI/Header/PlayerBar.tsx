import React, { FC } from "react";
import ControlsList from "./ControlsList";

const PlayerBar: FC = () => {
    return (
        <div className="player-bar">
            <div className="player-bar-progress"></div>
            <a className="player-bar-cover name-link">
                <img src="/images/default_player.png" alt="Default player"/>
            </a>
            <div className="player-bar-info"></div>
            <div className="player-bar-controls">
                <ControlsList/>
            </div>
        </div>
    );
};

export default PlayerBar;