import { Stack, Typography, Button, Grid, styled, Divider, Box, Avatar, IconButton, Tooltip, CircularProgress
  
 } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import VideoCard from '../VideoCard/VideoCard';
import { getChannelProfile } from '../../api/userService';
import { useRecoilState } from 'recoil';
import { channelDetails, userAtom } from '../../Store/atoms/userAtoms';
import { useEffect, useState } from 'react';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { getUserVideos } from '../../api/videoService';

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
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchChannel = async () => {
      try{
        setLoading(true);
        const response = await getChannelProfile(currentUser, setCurrentUser);
        setChannel(response);
        console.log("response",response);
      }
      catch(error){
        console.log("error",error);
      }
      finally{
        setLoading(false);
      }
      
    };
    fetchChannel();
  }, [currentUser,setCurrentUser,setChannel]);
  useEffect(()=>{
    const fetchVideos=async()=>{
      try {
        const response=await getUserVideos()
        setVideos(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchVideos()
  },[])
  console.log(channel)
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

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
            {videos.length > 0 && videos.map((video, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <VideoCard video={video} />
                </Grid>
            ))}
        </Grid>
    </>
  );
}

export default Channel;
