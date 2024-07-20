import  { useState } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer, Button, Divider, Snackbar, Alert } from '@mui/material';
import { Explore as ExploreIcon, Whatshot as WhatshotIcon, BarChart as BarChartIcon, Subscriptions as SubscriptionsIcon, PlaylistPlay as PlaylistPlayIcon, AccountCircle as AccountCircleIcon, ThumbUp as ThumbUpIcon, ExitToApp as ExitToAppIcon, Menu as MenuIcon, History as HistoryIcon } from '@mui/icons-material';
import Logout from '../logout/Logout';
import { useRecoilValue } from 'recoil';
import { checkUser } from '../../Store/atoms/userAtoms';
import SignupLoginButton from '../signupLoginButton/SignupLoginButton';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const userStatus = useRecoilValue(checkUser);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    // console.log(userStatus)
  };

  const handleLogoutSuccess = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
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
          {userStatus===true ? (
            <Box>
              <List>
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
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2, marginTop:'40vh'}}>
              <SignupLoginButton/>
          </Box>
          )}
        </List>
      </Box>
      {userStatus===true && (
        <Box sx={{ mt: 'auto' }}>
          <Divider sx={{ borderColor: '#555' }} />
          <List>
            <ListItem disablePadding>
              <ListItemButton sx={{ '&:hover': { backgroundColor: '#333' } }}>
                <ListItemIcon sx={{ color: '#fff' }}>
                  <ExitToAppIcon />
                </ListItemIcon>
                <Logout onLogout={handleLogoutSuccess} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      )}
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
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Logged out successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Sidebar;
