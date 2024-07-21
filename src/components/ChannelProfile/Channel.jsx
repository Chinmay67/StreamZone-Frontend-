import { Stack, Typography, Button, Grid, styled, Divider, Box, Avatar, IconButton, Tooltip
  
 } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import VideoCard from '../VideoCard/VideoCard';
import { getChannelProfile } from '../../api/userService';
import { useRecoilState } from 'recoil';
import { channelDetails, userAtom } from '../../Store/atoms/userAtoms';
import { useEffect, useState } from 'react';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',
}));

function Channel() {
  const [currentUser, setCurrentUser] = useRecoilState(userAtom);
  const [channel, setChannel] = useRecoilState(channelDetails);

  useEffect(() => {
    const fetchChannel = async () => {
      const response = await getChannelProfile(currentUser, setCurrentUser);
      setChannel(response.data);
      console.log(response.data);
    };
    fetchChannel();
  }, [setCurrentUser,setChannel,currentUser]);

  return (
    <>
      <Box sx={{ width: "60%", margin: "10px auto", padding: "5px", borderRadius: "5px", backgroundColor: 'white' }}>
        <Box sx={{ position: 'relative', marginBottom: '60px' }}>
          <img
            src={channel.coverImage}
            height={300}
            width="100%"
            style={{ objectFit: 'fill', borderRadius: '10px' }}
            alt="Cover"
          />
        </Box>

        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', marginTop: '-80px', paddingLeft: '20px' }}>
          <Avatar
            src={channel.avatar}
            alt={channel.username}
            sx={{ width: 150, height: 150, border: '4px solid white', borderRadius: '50%' }}
          />
          <Box sx={{ marginLeft: '20px' }}>
            <Typography variant="h4">{channel.username}</Typography>
            <Typography variant="h6">@{channel.fullname}</Typography>
            <Typography variant="h6">{channel.subscribersCount} Subscribers</Typography>
          </Box>
          <Tooltip title="Edit" arrow>
          <IconButton
          
            sx={{ position: 'absolute', bottom: 0, right: 0,border:'1px solid grey' }}
          >
            <ModeEditOutlineIcon />
          </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Divider orientation="horizontal" variant="middle" sx={{ margin: "30px" }} />

      <Grid container spacing={0.2}>
        {[...Array(10)].map((_, index) => (
          <Grid item xs={2.4} key={index}>
            <VideoCard />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Channel;
