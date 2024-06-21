import { Stack, Typography, Button, Grid, styled, Divider } from '@mui/material'
// import React from 'react'
import './ChannelProfile.css'
import {useMediaQuery} from '@mui/material';

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import VideoCard from '../VideoCard/VideoCard';

const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    // border: '1px solid',
    borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
    padding: theme.spacing(1),
    borderRadius: '4px',
    textAlign: 'center',
    
  }));
  
function ChannelProfile() {
    // const isDesktop=useMediaQuery((theme)=>theme.breakpoints.up('sm'))
    return (
        <>
            <Grid container spacing={0.5} sx={{ width: "80%", margin: "auto", padding: "5px", borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px" }}>
                <Grid item xs={12} sx={{ width: "100%", borderRadius: "10px", padding: "5px" }}>
                    <Item>
                    <img src='http://res.cloudinary.com/ds23bhkcd/image/upload/v1713597990/bqk2xmrvw2erp6ly60sv.jpg'
                        height={200} width="100%"
                        style={{ objectFit: 'cover', margin: 'auto', borderRadius: '10px', margin: "5px" }} />
                    </Item>
                </Grid>

                <Grid item xs={12} sm={2} sx={{ justifyContent: "flex-start", padding: "5px", display: { xs: "none", sm: "block" } }}>
                    <Item sx={{ width: '100%', paddingTop: '100%', position: 'relative', borderRadius: '50%', overflow: 'hidden' }}>
                        <img src='http://res.cloudinary.com/ds23bhkcd/image/upload/v1713597990/bqk2xmrvw2erp6ly60sv.jpg'
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                    </Item>
                </Grid>


                <Grid item xs={12} sm={8} md={6} lg={6} xl={6} sx={{ borderRadius: "50px", padding: "5px" }}>
                    <Item>
                    <Stack spacing={3}>
                        <Typography variant='h4'>Channel Name</Typography>
                        <Typography variant='h6'>Full Name</Typography>
                        <Typography variant='h6'>Subscribers</Typography>
                    </Stack>
                    </Item>
                </Grid>

                <Grid item xs={12} sm={2} md={4} lg={4} xl={4} sx={{ borderRadius: "50px", padding: "5px" }}
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-end">
                    <Button variant='contained' sx={{ backgroundColor: '#0a2a91', width: "150px" }} endIcon={<NotificationsNoneIcon />}><Typography sx={{display:{xs:"none",sm:"none",md:"block"}}}>Subscribe</Typography></Button>
                </Grid>
            </Grid>
            <Divider orientation="horizontal" variant="middle" sx={{margin:"30px"}} />
            <Grid container spacing={0.2}>
                <Grid item xs={2.4}>
                    <VideoCard/>
                </Grid>
                <Grid item xs={2.4}>
                    <VideoCard/>
                </Grid>
                <Grid item xs={2.4}>
                    <VideoCard/>
                </Grid>
                <Grid item xs={2.4}>
                    <VideoCard/>
                </Grid>
                <Grid item xs={2.4}>
                    <VideoCard/>
                </Grid>
                <Grid item xs={2.4}>
                    <VideoCard/>
                </Grid>
                <Grid item xs={2.4}>
                    <VideoCard/>
                </Grid>
                <Grid item xs={2.4}>
                    <VideoCard/>
                </Grid>
                <Grid item xs={2.4}>
                    <VideoCard/>
                </Grid>
                <Grid item xs={2.4}>
                    <VideoCard/>
                </Grid>
                
                
                
                
            </Grid>
            
        </>
            
            
                
           
           
                
            
                
              
        
    
    )
    
}

export default ChannelProfile
