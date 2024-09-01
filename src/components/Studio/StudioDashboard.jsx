import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { Edit, BarChart, VideoLibrary } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ChannelStatDialogbox from '../stats/ChannelStatDialogbox';
import { getChannelStats } from '../../api/studioService';

const StudioDashboard = () => {
  const [statOpen, setStatOpen]=useState(false)
  const [channelStat,setChannelStat]=useState(null)

  const handleStatDialogBox=async()=>{
    try {
      const response=await getChannelStats()
      console.log(response)
      setChannelStat(response)
      setStatOpen(true)
    } catch (error) {
      console.log(error)
    }
  }
  const handleStatDialogBoxClose=()=>{
    setStatOpen(false)
  }
  const navigate=useNavigate()
  const cardData = [
    {
      title: 'Edit Video',
      icon: <VideoLibrary fontSize="large" />,
      action: () => navigate('/studio/edit-videos'),
      text:"Edit video title, thumbnail or description ,change Publish Status, delete Videos "
    },
    {
      title: 'Edit Channel Profile',
      icon: <Edit fontSize="large" />,
      action: () => navigate('/studio/edit-channel'),
      text:"Edit Channel avatar, coverImage and personal Profile details"
    },
    {
      title: 'View Channel Stats',
      icon: <BarChart fontSize="large" />,
      action: handleStatDialogBox,
      text:"View Channel views, likes, comments, subscribers"
    },
  ];

  return (
    <>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Your Studio
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {cardData.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                style={{
                  backgroundColor: '#e0f7fa',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {card.icon}
                    <Typography variant="h6" style={{ margin: '10px 0' }}>
                      {card.title}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={card.action}>
                      {card.title}
                    </Button>
                    <Typography variant="p" style={{ margin: '10px 0',color:'gray' }}>
                      {card.text}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <ChannelStatDialogbox open={statOpen} handleClose={handleStatDialogBoxClose} userStats={channelStat}/>
      </div>
    </>
  );
};

export default StudioDashboard;

