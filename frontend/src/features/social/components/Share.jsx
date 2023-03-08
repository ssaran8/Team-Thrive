import { useState } from "react";
import { PermMedia, Label } from "@mui/icons-material";
import { Avatar, Paper, Box, TextField, Button } from "@mui/material";
import { axios } from "../../../lib/axios";
import { getAuth } from "firebase/auth";
import dayjs from "dayjs";


export const Share = ({posts, setPosts}) => {

  const [postText, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = () => {
    console.log("Starts submission")
    setLoading(true);
    axios.post('/createPost',
      {
        uid: getAuth().currentUser.uid,
        post: postText,
      },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => {
      setText('');
      setPosts([...posts, res.data]);
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <Paper sx={{ width: '100%', height: '190px', borderRadius: '10px' }}>
      <Box sx={{ padding: "10px" }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ height: "55px", width: '55px', objectFit: 'cover', mr: '10px' }} src={getAuth().currentUser.photoURL}/>
          <TextField sx={{ width: '100%', mr: '10px' }} inputProps={{ maxLength: 100 }} label="What's on your mind?" variant="outlined" multiline onChange={handleChange} value={postText} />
          <Button sx={{ color: "white", height: '55px' }} variant="contained" size="large" type="submit" value="Post" onClick={handleSubmit} disabled={loading || !postText} >Post</Button>
          {/* <input style={{border: 'none', padding: '7px', marginRight: '20px', borderRadius: '5px', backgroundColor: '#5bebbd', color: 'white', cursor: 'pointer' }} type="submit" value="Post" onClick={handleSubmit}/> */}
        </Box>
        <hr style={{ margin: '20px' }}></hr>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', marginLeft: '20px' }} >
            {/* TODO: remove media and tag buttons from posts? */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '15px', cursor: 'pointer' }}>
              <PermMedia sx={{ fontSize: '18px', marginRight: '3px', color: '#03b1fc' }} />
              <span style={{ fontSize: '15px', fontWeight: '500' }}>Photo/Video</span>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '15px', cursor: 'pointer' }}>
              <Label sx={{ fontSize: '18px', marginRight: '3px', color: '#fc4103' }} />
              <span style={{ fontSize: '15px', fontWeight: '500' }}>Tag</span>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  )

}

