// import { AppBar, Toolbar, styled, Box, Typography, InputBase, Avatar, CircularProgress, Button, IconButton, Stack } from '@mui/material';
// import { useState } from 'react';
// import SearchIcon from '@mui/icons-material/Search';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Mail, Notifications } from '@mui/icons-material';
// import Badge from '@mui/material/Badge';
// import { Menu, MenuItem } from '@mui/material';
// import SlowMotionVideoOutlinedIcon from '@mui/icons-material/SlowMotionVideoOutlined';
// import Sidebar from '../Sidebar/Sidebar';
// import { useRecoilState } from 'recoil';
// import { checkUser, userAtom } from '../../Store/atoms/userAtoms';
// import SignupLoginButton from '../signupLoginButton/SignupLoginButton';
// import Logout from '../logout/Logout';

// const StyledToolbar = styled(Toolbar)({
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   height: '8vh',
//   backgroundColor: "#444",  // Updated color
// });

// const SearchContainer = styled(Box)({
//   flex: 1,
//   display: 'flex',
//   justifyContent: 'center',  // Centering the search bar
// });

// const Search = styled('div')(({ theme }) => ({
//   backgroundColor: "#f0f0f0",
//   padding: "5px 10px",
//   borderRadius: theme.shape.borderRadius,
//   width: "50%",
//   display: 'flex',
//   alignItems: 'center',
// }));

// const Inp = styled(InputBase)({
//   margin: "0px",
//   backgroundColor: "transparent",
//   padding: "0 10px",
//   width: "100%",
// });

// const Icons = styled(Box)(({ theme }) => ({
//   display: "none",
//   alignItems: "center",
//   gap: "30px",
//   [theme.breakpoints.up("sm")]: {
//     display: "flex"
//   }
// }));

// const UserBox = styled(Box)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   gap: "10px",
//   [theme.breakpoints.up("sm")]: {
//     display: "none"
//   }
// }));

// function Header() {
//   const [open, setOpen] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [userStatus, setUserStatus] = useRecoilState(checkUser);
//   const [currentUser, setCurrentUser] = useRecoilState(userAtom);
//   const [loading, setLoading] = useState(false);

//   const toggleSidebarDrawer = (newOpen) => () => {
//     setSidebarOpen(newOpen);
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <AppBar position='sticky'>
//       <StyledToolbar>
//         <Stack direction='row'>
//           <IconButton onClick={toggleSidebarDrawer(true)} sx={{ color: "#fff" }}>
//             <MenuIcon />
//           </IconButton>
//           <Typography variant='h6' sx={{ display: { xs: "none", sm: "block" }, color: "#fff" }}>
//             NewTube
//           </Typography>
//         </Stack>
//         <Sidebar open={sidebarOpen} toggleDrawer={toggleSidebarDrawer} />
//         <SlowMotionVideoOutlinedIcon sx={{ display: { xs: "block", sm: "none" }, color: "#fff" }} />

//         {/* <SearchContainer>
//           <Search>
//             <Inp placeholder="Search..." />
//             <SearchIcon sx={{ color: "black" }} />
//           </Search>
//         </SearchContainer> */}

//         {userStatus ? (
//           <>
//             <Icons>
//               <Badge badgeContent={4} color="error">
//                 <Mail sx={{ color: "#fff" }} />
//               </Badge>
//               <Badge badgeContent={2} color="error">
//                 <Notifications sx={{ color: "#fff" }} />
//               </Badge>
//               <Avatar
//                 src={currentUser.avatar}
//                 sx={{ width: 50, height: 50 }}
//                 onClick={e => setOpen(true)}
//               />
//             </Icons>
//             <UserBox onClick={e => setOpen(true)}>
              
//               <Typography variant='span' sx={{ color: "#fff" }}>{currentUser.username}</Typography>
//             </UserBox>
//             <Menu
//               id="demo-positioned-menu"
//               aria-labelledby="demo-positioned-button"
//               open={open}
//               onClose={e => setOpen(false)}
//               anchorOrigin={{
//                 vertical: 80,
//                 horizontal: 'right',
//               }}
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//             >
//               <MenuItem>Profile</MenuItem>
//               <MenuItem>My account</MenuItem>
//               <MenuItem><Logout /></MenuItem>
//             </Menu>
//           </>
//         ) : (
//           <SignupLoginButton />
//         )}
//       </StyledToolbar>
//     </AppBar>
//   );
// }

// export default Header;
import {
  AppBar, Toolbar, styled, Box, Typography, InputBase, Avatar, CircularProgress, Button, IconButton, Stack,
} from '@mui/material';
import { useState } from 'react';
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
import Logout from '../logout/Logout';

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: '8vh',
  backgroundColor: "#444",  // Updated color
});

const SearchContainer = styled(Box)({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',  // Centering the search bar
});

const Search = styled('div')(({ theme }) => ({
  backgroundColor: "#f0f0f0",
  padding: "5px 10px",
  borderRadius: theme.shape.borderRadius,
  width: "50%",
  display: 'flex',
  alignItems: 'center',
}));

const Inp = styled(InputBase)({
  margin: "0px",
  backgroundColor: "transparent",
  padding: "0 10px",
  width: "100%",
});

const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userStatus, setUserStatus] = useRecoilState(checkUser);
  const [currentUser, setCurrentUser] = useRecoilState(userAtom);
  const [loading, setLoading] = useState(false);

  const toggleSidebarDrawer = (newOpen) => () => {
    setSidebarOpen(newOpen);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AppBar position='sticky'>
      <StyledToolbar>
        <Stack direction='row' alignItems="center" spacing={2}>
          <IconButton onClick={toggleSidebarDrawer(true)} sx={{ color: "#fff" }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' sx={{ color: "#fff" }}>
            NewTube
          </Typography>
        </Stack>
        
        <Sidebar open={sidebarOpen} toggleDrawer={toggleSidebarDrawer} />

        {userStatus ? (
          <Icons>
            <Badge badgeContent={4} color="error">
              <Mail sx={{ color: "#fff" }} />
            </Badge>
            <Badge badgeContent={2} color="error">
              <Notifications sx={{ color: "#fff" }} />
            </Badge>
            <Avatar
              src={currentUser.avatar}
              sx={{ width: 40, height: 40 }}
              onClick={e => setOpen(true)}
            />
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
              <MenuItem><Logout /></MenuItem>
            </Menu>
          </Icons>
        ) : (
          <SignupLoginButton />
        )}
      </StyledToolbar>
    </AppBar>
  );
}

export default Header;
