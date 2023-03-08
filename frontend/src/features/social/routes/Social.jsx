import { ContentLayout } from "../../../components/Layout/ContentLayout"
import { Share } from "../components/Share";
import { Feed } from "../components/Feed";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { axios } from "../../../lib/axios";

// Component for the Social Feed page. Contains the share component and a list of post components.
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
    <ContentLayout title={'Social Feed'} >
      {loading ? 
          <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <CircularProgress size={160}/>
          </Box> :
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
          }}
          scroll='paper'
        >
          <Share posts={posts} setPosts={setPosts}/>
          <Feed posts={posts}/>
        </Box>
      }
    </ContentLayout>
  );
}