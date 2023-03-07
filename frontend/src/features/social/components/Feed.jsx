import { useEffect, useState } from "react";

import { axios } from "../../../lib/axios";
import { Post } from "./Post";

export const Feed = ({ posts }) => {
    return (
        <>
            {posts.sort((a, b) => (new Date(b.datePosted)) - new Date(a.datePosted)).map((post) => <Post uid={post.authorId} content={post.text} />)}
        </>
    )
}