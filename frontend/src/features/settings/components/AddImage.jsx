import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { upload } from "../../../lib/firebase";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function AddImage() {
    const auth = getAuth();
    const user = auth.currentUser;
    const[photo, setPhoto] = useState(null);
    const[loading, setLoading] = useState(false);
    const [photoURL, setPhotoURL] = useState(getAuth().currentUser.photoURL || "https://www.nicepng.com/png/detail/73-730154_open-default-profile-picture-png.png")  
    
    function handleChange(e){
        if (e.target.files[0]) {
            setPhoto(e.target.files[0])
        }
    }

    function handleClick(){
        upload(photo, user, setLoading).then(() => {
            setPhotoURL(getAuth().currentUser.photoURL)
        })
    }
    
    return(
        <div>
            <Stack direction="row" spacing={2}>
                <Avatar
                    alt="Remy Sharp"
                    src={photoURL}
                    sx={{ width: 200, height: 200, borderRadius:"50%" }}
                    variant="square"
                 />
             </Stack>
            <input type="file" onChange={handleChange}/>
            <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
        </div>
    )
}