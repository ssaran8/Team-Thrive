import {useState} from "react";

import { PermMedia, Label} from "@mui/icons-material";
import { Avatar, Paper } from "@mui/material";


export const CreatePost = (uid) => {

    const [postText, setText] = useState('')

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = async () => {
        console.log("Starts submission")
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: 'FzBdGVh1flYAoJjtoKAhD0LIsIF3',
                post: postText,
            })
        }
        fetch('http://localhost:4567/createPost', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))

    }

    return (
        <Paper sx={{ width: '100%', height: '170px', borderRadius: '10px' }}>
          <div style={{ padding: "10px" }}>
            <div style={{  display: 'flex', alignItems: 'center' }}> 
              <Avatar sx={{ height: "50px", width:'50px', objectFit: 'cover', marginRight: '10px' }} />
              <input style={{border: 'none', width: '80%' }} placeholder="What's on your mind?" onChange={handleChange} value={postText}/>
              <input style={{border: 'none', padding: '7px', marginRight: '20px', borderRadius: '5px', backgroundColor: '#5bebbd', color: 'white', cursor: 'pointer' }} type="submit" value="Post" onClick={handleSubmit}/>
            </div>
            <hr style={{ margin: '20px' }}></hr>
            <div style={{  display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}> 
              <div style={{  display: 'flex', marginLeft: '20px'}} >
                <div style={{ display: 'flex', alignItems: 'center', marginRight: '15px', cursor: 'pointer' }}>
                  <PermMedia sx={{ fontSize: '18px', marginRight: '3px', color: '#03b1fc' }}/>
                  <span style={{ fontSize: '15px', fontWeight: '500'}}>Photo/Video</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginRight: '15px', cursor: 'pointer' }}>
                  <Label sx={{ fontSize: '18px', marginRight: '3px', color: '#fc4103' }}/>
                  <span style={{ fontSize: '15px', fontWeight: '500'}}>Tag</span>
                </div>
              </div>
            </div>
          </div>
        </Paper>
    )

}

