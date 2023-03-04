import { Container } from "@mui/system";
import { ContentLayout } from '../../../components/Layout/ContentLayout';
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { EditForm } from "../components/EditForm";
import { useState } from "react";


export const Settings = () => {
  const [open, setOpen] =  useState(false);

  const onClickEdit = () => {
    setOpen(true);
  }

  return (
    <ContentLayout title={'Settings'}>
      <Container>
        hello
        <IconButton component="label" onClick={onClickEdit}>
          <EditIcon />
        </IconButton>
        <EditForm open={open} onClose={() => setOpen(false)} />
      </Container>
    </ContentLayout>
  );
}