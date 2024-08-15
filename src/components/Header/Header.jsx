import { AppBar, Toolbar, styled, Box, Typography, InputBase, Avatar, CircularProgress, Button, IconButton, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { Mail, Notifications } from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import { Menu, MenuItem } from '@mui/material';
import SlowMotionVideoOutlinedIcon from '@mui/icons-material/SlowMotionVideoOutlined';
import Sidebar from '../Sidebar/Sidebar';
import { useRecoilState } from 'recoil';
import { checkUser, userAtom } from '../../Store/atoms/userAtoms';
import SignupLoginButton from '../signupLoginButton/SignupLoginButton';
import { getCurrentUser } from '../../api/userService';
import Logout from '../logout/Logout';

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  height:'8vh',
  justifyContent: "space-between",
  backgroundColor: "#333",
  

});

const Search = styled('div')(({ theme }) => ({
  backgroundColor: "whiteSmoke",
  padding: "05px 10px",
  borderRadius: theme.shape.borderRadius,
  width: "50%",
  display:'flex',
  alignItems:'center'
}));

const Inp = styled(InputBase)({
  margin: "0px 0px",
  backgroundColor: "whiteSmoke",
  padding: "-2px 10px",
  width: "100%",
});

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "30px",
  [theme.breakpoints.up("sm")]: {
    display: "flex"
  }
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none"
  }
}));

function Header() {
  const [open, setOpen] = useState(false);
  const [sidebarOpen,setSidebarOpen]=useState(false)
  const [userStatus, setUserStatus] = useRecoilState(checkUser);
  const [currentUser, setCurrentUser] = useRecoilState(userAtom);
  const [loading, setLoading] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    // console.log(userStatus)
  };
  const toggleSidebarDrawer=(newSidebarOpen)=>()=>{
    setSidebarOpen(newSidebarOpen)
  }
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       setLoading(true)
  //       const user = await getCurrentUser();
  //       setCurrentUser(user);
  //       if(user===null){
  //         setUserStatus(false)
  //       }
  //       else{
  //         setUserStatus(true)
  //       }
  //     } catch (error) {
  //       console.log("Error fetching user:", error);
  //       setUserStatus(false);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, [setCurrentUser, setUserStatus]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AppBar position='sticky' margin-bottom='5px'>
      <StyledToolbar>
      <Stack direction='row'>
        <Button onClick={toggleSidebarDrawer(true)} sx={{color:"#fff"}}>
            <MenuIcon />
          </Button>
          <Typography variant='h6' sx={{ display: { xs: "none", sm: "block" } }}>
            NewTube
          </Typography>
          </Stack>
        <Sidebar open={sidebarOpen} toggleDrawer={toggleSidebarDrawer} />
        <SlowMotionVideoOutlinedIcon sx={{ display: { xs: "block", sm: "none" } }} />
        <Search><Inp placeholder="Search..." /><SearchIcon sx={{color:"black"}}/> </Search>
        {userStatus ? (
          <>
            <Icons>
              <Badge badgeContent={4} color="error">
                <Mail />
              </Badge>
              <Badge badgeContent={2} color="error">
                <Notifications />
              </Badge>
              <Avatar
                src={currentUser.avatar}
                sx={{ width: 50, height: 50 }}
                onClick={e => setOpen(true)}
              />
            </Icons>
            <UserBox onClick={e => setOpen(true)}>
              <Avatar sx={{ width: 30, height: 30 , display:{xs:"none" , sx:"block"}}} />
              <Typography variant='span'>{currentUser.username}</Typography>
            </UserBox>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              open={open}
              onClose={e => setOpen(false)}
              anchorOrigin={{
                vertical: 80,
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem><Logout/></MenuItem>
            </Menu>
          </>
        ) : (
          <SignupLoginButton />
        )}
      </StyledToolbar>
    </AppBar>
  );
}

export default Header;
