import React, { FC } from "react";
import { Link } from "react-router-dom";

const ExtraInf: FC = () => {

    return (
        <div className="col-auxiliary">
            <p className="upgrade">
                Don't want to see ads? <Link className="upgrade-link" to="/search">Upgrade Now</Link>
            </p>
        </div>
    );
};

export default ExtraInf;