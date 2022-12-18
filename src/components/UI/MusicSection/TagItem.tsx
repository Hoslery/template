import React, {FC} from "react";
import { ITag } from "../../../types/types";

interface TagProps {
    tag: ITag
}

const TagItem: FC<TagProps> = ({tag}) => {
    return (
        <li className="tag-item">
            <a className="tag name-link" href={tag.url} title={tag.name}>{tag.name}</a>
        </li>
    );
};

export default TagItem;