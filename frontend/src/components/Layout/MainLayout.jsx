import {
  Drawer as MUIDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  IconButton,
  Avatar
} from '@mui/material';



import SpaIcon from '@mui/icons-material/Spa';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';

import { styled } from '@mui/material/styles';



import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';
import { Container } from '@mui/system';
import { logOut } from '../../lib/firebase';


export const MainLayout = ({ label, children }) => {
  const itemsList = [
    // {
    //     text: 'Logo',
    //     icon: <SpaIcon />,
    //     path: '/',
    // },
    {
        text: 'Dashboard',
        icon: <HomeIcon />,
        path: '/',
    },
    {
        text: 'Social',
        icon: <PeopleAltIcon />,
        path: '/',
    },
    {
        text: 'Calendar',
        icon: <CalendarMonthIcon />,
        path: '/calendar',
    },
    {
        text: 'Settings',
        icon: <SettingsIcon />,
        path: '/',
    }
];

  return (
    <div sx={{display: 'flex'}}>
      <MUIDrawer variant="permanent" sx={{ width: '600px' }}>
        <SpaIcon sx={{
          alignSelf: 'center',
          width: '80px',
          height: '80px',
          margin: '20px'
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
                <ListItemButton sx={{p: 8}} as={Link} to={path}>
                  {icon}
                  {/* <ListItemIcon>
                    {icon}
                  </ListItemIcon> */}
                </ListItemButton>
                  {/* <IconButton as={Link} to={path}>
                    {icon}
                  </IconButton> */}
              </ListItem>
            );
          })}
        </List>
      </MUIDrawer>
      <div>
        {/* TODO: calculate width of left navigation */}
        <AppBar position='fixed'
          sx={{
            width: `calc(100% - ${178}px)`,
            ml: `${178}px`, 
            display:'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <Toolbar>
            <h1>Thrive</h1>
          </Toolbar>
          <Avatar onClick={() => logOut()} sx={{alignSelf:'center', mr:5}} />

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
    </div>
  )
}