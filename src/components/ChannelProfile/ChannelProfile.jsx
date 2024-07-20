// import { Stack, Typography, Button, Grid, styled, Divider, Box } from '@mui/material'
// import React from 'react'
import './ChannelProfile.css'
// import {useMediaQuery} from '@mui/material';

import { useRecoilValue } from 'recoil';
import { checkUser } from '../../Store/atoms/userAtoms';
import SignupLoginButton from '../signupLoginButton/SignupLoginButton';
import Channel from './Channel';
import { Box } from '@mui/material';


  
function ChannelProfile() {
    // const isDesktop=useMediaQuery((theme)=>theme.breakpoints.up('sm'))
    
    const userStatus=useRecoilValue(checkUser)
    return (
        <>
        {userStatus===true ? 
            (
                <>
                    <Channel/>
                </>
            ):(
                <Box sx={{margin:'40vh'}}>
                    <SignupLoginButton/>
                </Box>
            )
        }
        </>
            
            
                
           
           
                
            
                
              
        
    
    )
    
}

export default ChannelProfile
