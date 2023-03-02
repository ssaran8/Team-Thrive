import {useEffect, useState} from "react";

export const Feed = () => {

    const [posts, setPosts] = useState([])
    const [listPosts, setList] = useState([])
    const [loaded, setLoaded] = useState(false)

   useEffect(() => {
       if(!loaded){
           getPosts()
           renderPosts()
           if(posts.length != 0) setLoaded(true)
       }
    })

    const getPosts = () => {
        fetch('http://localhost:4567/fetchPostsTest')
            .then(response => {
                return response.json()
            })
            .then(data => {
                setPosts(data)
            })
            .catch(error => {
                console.log(error)
            })
        console.log(posts)
    }

    const renderPosts = () => {
        let l = posts.map(post => {
            return <p>{post.text}</p>
            /**
            <div>
                Date: {post.datePosted}
                User: {post.userId}
                Text: {post.text}
            </div>**/
        })
        setList(l)
    }
    return(
        <div>
            {listPosts}
        </div>
    )
}