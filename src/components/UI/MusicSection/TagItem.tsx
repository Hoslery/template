import React, {FC} from "react";
import { ITag } from "../../../types/types";

interface TagProps {
    tag: ITag
}

/**
 * Функциональный компонент, отвечающий за тег в списке тегов для популярных артистов/треков
 */
const TagItem: FC<TagProps> = ({tag}) => {
    return (
        <li className="tag-item">
            <a className="tag name-link" href={tag.url} title={tag.name}>{tag.name}</a>
        </li>
    );
};

export default TagItem;