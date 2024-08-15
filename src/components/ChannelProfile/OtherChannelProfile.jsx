import { Avatar, Box, Divider, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import VideoCard from '../VideoCard/VideoCard'
import { useParams } from 'react-router-dom'
import { fetchOtherChannelProfile, fetchOtherChannelVideos } from '../../api/free';

function OtherChannelProfile() {
  const {channelName}=useParams();
  const [channel , setChannel]=useState(null)
  useEffect(()=>{
    const fetchOtherChannel=async(channelName)=>{
      try {
        const response= await fetchOtherChannelProfile(channelName)
        console.log(response)
        setChannel(response)
      } catch (error) {
        console.error(error)
      }

    }
    fetchOtherChannel(channelName)
  },[])
  useEffect(()=>{
    const fetchOtherChannelVideo=async(channelName)=>{
     try {
       const response=await fetchOtherChannelVideos(channelName)
       return response
     } catch (error) {
      console.log(error)
     }
    }
    fetchOtherChannelVideo(channelName)
  },[channelName])
  return (
    <>
    <Box sx={{ width: "60%", margin: "10px auto", padding: "5px", borderRadius: "5px", backgroundColor: 'white' }}>
        <Box sx={{ position: 'relative', marginBottom: '60px' }}>
          <img
            src={channel?.coverImage}
            height={300}
            width="100%"
            style={{ objectFit: 'fill', borderRadius: '10px' }}
            alt="Cover"
          />
        </Box>

        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', marginTop: '-80px', paddingLeft: '20px' }}>
          <Avatar
            src={channel?.avatar}
            alt={channel?.username}
            sx={{ width: 150, height: 150, border: '4px solid white', borderRadius: '50%' }}
          />
          <Box sx={{ marginLeft: '20px' }}>
            <Typography variant="h4">{channel?.username}</Typography>
            <Typography variant="h6">@{channel?.fullname}</Typography>
            <Typography variant="h6">{channel?.subscribersCount} Subscribers</Typography>
          </Box>
          
          {/* <Tooltip title="Edit" arrow>
          <IconButton
          
            sx={{ position: 'absolute', bottom: 0, right: 0,border:'1px solid grey' }}
          > */}
            {/* <ModeEditOutlineIcon /> */}
          {/* </IconButton> */}
          {/* </Tooltip> */}
        </Box>
      </Box>

      <Divider orientation="horizontal" variant="middle" sx={{ margin: "30px" }} />

      {/* <Grid container spacing={0.2}>
            {videos.length > 0 && videos.map((video, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <VideoCard video={video} />
                </Grid>
            ))}
        </Grid> */}
    </>
  )
}

export default OtherChannelProfile
