import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from "@mui/material/Avatar"
import { Dialog, DialogContent, IconButton, DialogTitle, DialogActions } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { Container } from "@mui/system";
import { getAuth, updateProfile } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

function Display() {
  const auth = getAuth();
  const user = auth.currentUser;
  return <h1>Hello, {user.displayName}</h1>;

}

// Component for editing information on profile.
export const EditForm = ({open, onClose}) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [photo, setPhoto] = useState();
   
  useEffect(() => {
    if (open) {
      const user = getAuth().currentUser;
      setName(user.displayName);
      setEmail(user.email);
      setPhone(user.phoneNumber);
      setPhoto(user.photoURL)
    }
  }, [open]);

  const handleClose = () => {
    onClose();
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, email, phone)
    updateProfile(getAuth().currentUser, {
      displayName: name,
      email: email,
      phoneNumber: phone,
      photoURL: photo
    }).then(() => {
      alert("Succesfully updated!");
      onClose();
    }).catch((error) => {
      alert(error);
    });
  }

  const onNameChange = (e) => {
    setName(e.target.value);
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const onPhoneChange = (e) => {
    setPhone(e.target.value);
  }

  return (
    <div>
      <Dialog
      open={open} 
      onClose={handleClose}
      fullWidth
    >
      <DialogTitle sx={{textAlign: 'center'}}>Edit Information </DialogTitle>
      <DialogContent>
        <Container
          sx={{
            padding: 2,
            '> *': {
              width: '100%',
              margin: 1,
              p:0,
            },
            boxSizing: 'border-box'
          }}
        >
      
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div>
            <TextField
              required
              id="outlined-required"
              label="Name"
              value={name}
              onChange={onNameChange}
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="Email"
              value={email}
              onChange={onEmailChange}
            />
            <TextField
              required
              id="outlined-required"
              label="Phone Number"
              value={phone}
              onChange={onPhoneChange}
            />
          </div>

          <div>
            <Stack spacing={2} direction="row">
              <Button variant="contained" type="submit">Save Changes</Button>
            </Stack>
          </div>
        </Box>
        </Container>
      </DialogContent>
    </Dialog>
  </div>
  )
}