import {
  Drawer as MUIDrawer,
  List,
  ListItem,
  ListItemButton,
  IconButton,
  Avatar
} from '@mui/material';

import SpaIcon from '@mui/icons-material/Spa';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import { logOut } from '../../lib/firebase';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import LogoutIcon from '@mui/icons-material/Logout';
import { getAuth } from 'firebase/auth';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5bebbd',
    },
    secondary: {
      main: red[500],
    },
  },
});

// Main layout component shared throughout entire application. Consists of title bar and navigation bar.
export const MainLayout = ({ label, children }) => {
  const itemsList = [
    {
      text: 'Dashboard',
      icon: <HomeIcon />,
      path: '/',
    },
    {
      text: 'Social',
      icon: <PeopleAltIcon />,
      path: '/social',
    },
    {
      text: 'Calendar',
      icon: <CalendarMonthIcon />,
      path: '/calendar',
    },
    {
      text: 'Settings',
      icon: <SettingsIcon />,
      path: '/settings',
    }
  ];

  return (
    <div sx={{ display: 'flex' }}>
      <ThemeProvider theme={theme}>
        <MUIDrawer variant="permanent" >
          <SpaIcon sx={{
            alignSelf: 'center',
            width: '80px',
            height: '80px',
            margin: '20px',
            color: '#5bebbd'
          }} />
          <List
            sx={{
              '& svg': {
                width: '50px',
                height: '50px',
              }
            }}
          >
            {itemsList.map((item, index) => {
              const { text, icon, path } = item;
              return (
                <ListItem key={text} disablePadding >
                  <ListItemButton sx={{p: 8, color: '#5bebbd'}} as={Link} to={path}>
                    {icon}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </MUIDrawer>
        <div>
          <AppBar position='fixed'
            sx={{
              width: `calc(100% - ${178}px)`,
              ml: `${178}px`,
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            <Toolbar>
              <h1>Thrive</h1>
            </Toolbar>
            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Box>
                <IconButton onClick={() => logOut()}>
                  <LogoutIcon fontSize='large' />
                </IconButton>
              </Box>
              <Link to="/settings">
                <Avatar sx={{ ml: 2, mr: 5, cursor: 'pointer'}} src={getAuth().currentUser.photoURL} />
              </Link>
            </Box>

          </AppBar>
          <Box
            sx={{
              width: `calc(100% - ${178}px)`,
              ml: `${178}px`,
              mt: `${85.88}px`,
              height: `calc(100vh - ${85.88}px)`,
              outline: 'solid',
            }}
          >
            {children}
          </Box>
        </div>
      </ThemeProvider>
    </div>
  )
}