import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from "@mui/material/Avatar"
import { Dialog, DialogContent, IconButton, DialogTitle, DialogActions } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { Container } from "@mui/system";

export const TestComponent = (open, onClose) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setNumber] = useState('');

  useEffect(() => {
    if (open) {
      setFirstName('');
      setLastName('');
      setEmail('');
      setNumber('');
    }
  }, [open]);

  const handleClose = () => {
    onClose();
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(firstName, lastName, email, phoneNumber)
  }

  const onFirstNameChange = (e) => {
    setFirstName(e.target.value);
  }

  const onLastNameChange = (e) => {
    setLastName(e.target.value);
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const onNumberChange = (e) => {
    setNumber(e.target.value);
  }

  const EditForm = () => {
    return (
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
              label="First name"
              value={firstName}
              onChange={onFirstNameChange}
            />
            <TextField
              required
              id="outlined-required"
              label="Last name"
              value={lastName}
              onChange={onLastNameChange}
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
              value={phoneNumber}
              onChange={onNumberChange}
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
    )
  }



  return (
    <IconButton component="label" onClick={EditForm()}>
      <EditIcon />
    </IconButton>
  )
}