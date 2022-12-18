import React, {FC} from "react";
import { ITag } from "../../../types/types";
import TagItem from "./TagItem";

interface TagsProps {
    tags: ITag[],
    width?: string
}

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