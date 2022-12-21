import React, {FC} from "react";
import { ITag } from "../../../types/types";
import TagItem from "./TagItem";

interface TagsProps {
    tags: ITag[],
    width?: string
}

/**
 * Функциональный компонент, отвечающий за список тегов для популярных артистов/треков
 */
const TagsList: FC<TagsProps> = ({tags, width}) => {
    return (
        <section className="close-tags">
            <ul className="tags-list" style={{width}}>
                {tags.map((tag, index) => 
                    <TagItem tag={tag} key={index}/>
                )}
            </ul>
        </section>
    );
};

export default TagsList;