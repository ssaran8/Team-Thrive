import { ContentLayout } from "../../../components/Layout/ContentLayout"
import { Share } from "../components/Share";
import { Feed } from "../components/Feed";
import { Post } from "../components/Post";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

import { axios } from "../../../lib/axios";

export const Social = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      axios.get('/fetchPosts').then((res) => {
          setPosts(res.data);
          setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts])

  return (
    <ContentLayout title={'Social Feed'}>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: "column",
          height: 700,
          overflow: "hidden",
          overflowY: "scroll",
          height: '100%',
          borderRadius: 5
          // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
        }}
        scroll='paper'
      >
        <Share posts={posts} setPosts={setPosts}/>
        <Feed posts={posts}/>
      </Box>
    </ContentLayout>
  );
}