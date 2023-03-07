import { Container } from "@mui/system";
import { ContentLayout } from '../../../components/Layout/ContentLayout';
import { Box, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { EditForm } from "../components/EditForm";
import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import AddImage from "../components/AddImage";
import { Add } from "@mui/icons-material";

const message = "User!"

export const Settings = () => {
  
  const auth = getAuth();
  const user = auth.currentUser;
  const [open, setOpen] =  useState(false);


  const onClickEdit = () => {
    setOpen(true);
  }

  return (
    <ContentLayout title={'Profile'}>
      <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h1>Welcome to Thrive {user.displayName || ""}</h1>
        <Box>
          <IconButton component="label" onClick={onClickEdit}>
            <EditIcon fontSize="large"/>
          </IconButton>
        </Box>
      </Box>
      <Box>
        < AddImage/>
      </Box>
      <Box>
        <EditForm open={open} onClose={() => setOpen(false)} />
      </Box>
    </ContentLayout>
  );
}