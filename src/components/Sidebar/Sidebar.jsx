import React from 'react';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ExploreIcon from '@mui/icons-material/Explore';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import BarChartIcon from '@mui/icons-material/BarChart';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import HistoryIcon from '@mui/icons-material/History';

const Sidebar = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#1a1a1a',
        color: '#fff',
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton sx={{ '&:hover': { backgroundColor: '#333' } }}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <ExploreIcon />
              </ListItemIcon>
              <ListItemText primary="Explore" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ '&:hover': { backgroundColor: '#333' } }}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <WhatshotIcon />
              </ListItemIcon>
              <ListItemText primary="Trending" />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ borderColor: '#555' }} />
          <ListItem disablePadding>
            <ListItemButton sx={{ '&:hover': { backgroundColor: '#333' } }}>
              
              <ListItemText primary="Personal" />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ borderColor: '#555' }} />
          <ListItem disablePadding>
            <ListItemButton sx={{ '&:hover': { backgroundColor: '#333' } }}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Channel Stats" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ '&:hover': { backgroundColor: '#333' } }}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <SubscriptionsIcon />
              </ListItemIcon>
              <ListItemText primary="Subscriptions" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ '&:hover': { backgroundColor: '#333' } }}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <PlaylistPlayIcon />
              </ListItemIcon>
              <ListItemText primary="Playlists" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ '&:hover': { backgroundColor: '#333' } }}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary="Watch History" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ '&:hover': { backgroundColor: '#333' } }}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Channel Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ '&:hover': { backgroundColor: '#333' } }}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <ThumbUpIcon />
              </ListItemIcon>
              <ListItemText primary="Liked Videos" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider sx={{ borderColor: '#555' }} />
      </Box>
      <Box>
        <Divider sx={{ borderColor: '#555' }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton sx={{ '&:hover': { backgroundColor: '#333' } }}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ margin: '0' }}>
      <Button onClick={toggleDrawer(true)} sx={{ color: '#fff' }}>
        <MenuIcon />
      </Button>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#1a1a1a',
            color: '#fff',
            transition: 'width 0.3s',
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
