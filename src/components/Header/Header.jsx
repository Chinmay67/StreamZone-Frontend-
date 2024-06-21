import { AppBar, Toolbar,styled,Box, Typography, InputBase, Avatar } from '@mui/material'
// import React from 'react'
// import {borderRadius} from "@mui/system"
import { useState } from 'react';
// import { theme } from '../../theme';
import {Mail, Notifications } from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import { Menu,MenuItem} from '@mui/material';

import SlowMotionVideoOutlinedIcon from '@mui/icons-material/SlowMotionVideoOutlined';
import Sidebar from '../Sidebar/Sidebar';
const StyledToolbar=styled(Toolbar)({
    display:"flex",
    justifyContent:"space-between",
    backgroundColor:"#333",
})
const Search=styled('div')(({theme})=>({
    backgroundColor:"whiteSmoke",
    padding:"0 10px",
    borderRadius: theme.shape.borderRadius,
    width:"40%",
}))
const Inp=styled(InputBase)({
    margin:"0px 0px",
    backgroundColor:"whiteSmoke",
    padding:"0 10px",
    // borderRadius: theme.shape.borderRadius,
    width:"100%",
})
const Icons=styled(Box)(({theme})=>({
  display:"none",
  alignItems:"center",
  gap:"20px",
  [theme.breakpoints.up("sm")]:{
    display:"flex"
  }
}))
const UserBox=styled(Box)(({theme})=>({
    display:"flex",
    alignItems:"center",
    gap:"10px",
    [theme.breakpoints.up("sm")]:{
        display:"none"
    }
  
  }))
function Header() {
    const [open,setOpen]=useState(false)
    return (
        <AppBar position='sticky' margin-bottom='5px' >
           
            <StyledToolbar >
                <Sidebar />
                <Typography variant='h6' sx={{display:{xs:"none",sm:"block"}}}>
                    NewTube
                </Typography>
                <SlowMotionVideoOutlinedIcon sx={{display:{xs:"block",sm:"none"}}} />
                <Search><Inp placeholder="Search..."/></Search>  
                <Icons>
                    <Badge badgeContent={4} color="error">
                        <Mail />
                    </Badge>
                    <Badge badgeContent={2} color="error">
                        <Notifications  />
                    </Badge>
                    
                    <Avatar sx={{width:30,height:30}}
                        onClick={e=>setOpen(true)}
                    />
                   

                </Icons>  
                <UserBox onClick={e=>setOpen(true)}>
                    <Avatar sx={{width:30,height:30}}/>
                    <Typography variant='span'>John</Typography>
                </UserBox>
                <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                // anchorEl={anchorEl}
                open={open}
                onClose={e=>setOpen(false)}
                // onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                >
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem>Logout</MenuItem>
      </Menu>      
            </StyledToolbar>
            
        </AppBar>
    )
}

export default Header
