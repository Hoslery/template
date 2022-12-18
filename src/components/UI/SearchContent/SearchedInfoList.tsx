import React, {FC} from "react";
import { IArtist, IInfo } from "../../../types/types";

interface InfoListProps<T> {
    items: T[],
    renderItem: (item: T) => React.ReactNode
}

function SearchedInfoList<T>(props: InfoListProps<T>)  {
    return (
        <ol className="grid-items list-type-none">
            {props.items.map(props.renderItem)}
        </ol>
    );
};

export default SearchedInfoList;