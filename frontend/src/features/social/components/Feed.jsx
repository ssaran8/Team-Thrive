import { Post } from "./Post";

// Wrapper component for a list of posts that are rendered on the social feed page.
export const Feed = ({ posts }) => {
    return (
        <>
            {posts.sort((a, b) => (new Date(b.datePosted)) - new Date(a.datePosted)).map((post) => <Post uid={post.username} content={post.content} />)}
        </>
    )
}