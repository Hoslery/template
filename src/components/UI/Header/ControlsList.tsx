import React, { FC } from "react";

const ControlsList: FC = () => {
    return (
        <ul className="media-controls list-type-none">
            <li>
                <button className="player-bar-btn player-bar-btn--previous button-set">
                </button>
            </li>
            <li>
                <button className="player-bar-btn player-bar-btn--play button-set">
                </button>
            </li>
            <li>
                <button className="player-bar-btn player-bar-btn--next button-set">
                </button>
            </li>
        </ul>
    );
};

export default ControlsList;