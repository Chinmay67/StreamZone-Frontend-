import { Stack, Typography, Button, Grid, styled, Divider, Box, Avatar, IconButton, Tooltip, CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import VideoCard from '../VideoCard/VideoCard';
import { getChannelProfile } from '../../api/userService';
import { useRecoilState } from 'recoil';
import { channelDetails, userAtom } from '../../Store/atoms/userAtoms';
import { useEffect, useState } from 'react';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { getUserVideos, uploadVideo } from '../../api/videoService';
import { useNavigate } from 'react-router-dom';

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
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate=useNavigate()
  useEffect(() => {
    const fetchChannel = async () => {
      try{
        setLoading(true);
        const response = await getChannelProfile(currentUser, setCurrentUser);
        setChannel(response);
      }
      catch(error){
        console.log("error",error);
      }
      finally{
        setLoading(false);
      }
    };
    fetchChannel();
  }, [currentUser, setCurrentUser, setChannel]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getUserVideos();
        setVideos(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideos();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ width: isMobile ? "100%" : "60%", margin: "10px auto", padding: "5px", borderRadius: "5px", backgroundColor: 'white' }}>
        <Box sx={{ position: 'relative', marginBottom: '60px' }}>
          <img
            src={channel?.coverImage}
            height={isMobile ? 150 : 300}
            width="100%"
            style={{ objectFit: 'fill', borderRadius: '10px' }}
            alt="Cover"
          />
        </Box>

        <Box sx={{ position: 'relative', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', marginTop: isMobile ? '-40px' : '-80px', paddingLeft: isMobile ? '0' : '20px', textAlign: isMobile ? 'center' : 'left' }}>
          <Avatar
            src={channel?.avatar}
            alt={channel?.username}
            sx={{ width: isMobile ? 100 : 150, height: isMobile ? 100 : 150, border: '4px solid white', borderRadius: '50%', margin: isMobile ? 'auto' : '0' }}
          />
          <Box sx={{ marginLeft: isMobile ? '0' : '20px', marginTop: isMobile ? '10px' : '0' }}>
            <Typography variant={isMobile ? "h5" : "h4"}>{channel?.username}</Typography>
            <Typography variant="h6">@{channel?.fullname}</Typography>
            <Typography variant="h6">{channel?.subscribersCount} Subscribers</Typography>
          </Box>
          {!isMobile && (
            <Tooltip title="Edit" arrow>
              <IconButton
                sx={{ position: 'absolute', bottom: 0, right: 0, border: '1px solid grey' }}
              >
                <ModeEditOutlineIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        {isMobile && (
          <Tooltip title="Edit" arrow>
            <IconButton
              sx={{ margin: '10px auto', border: '1px solid grey' }}
            >
              <ModeEditOutlineIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Divider orientation="horizontal" variant="middle" sx={{ margin: "30px" }} />

      <Grid container spacing={0.2}>
        {videos.length > 0 && videos.map((video, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <VideoCard video={video} />
          </Grid>
        ))}
      </Grid>
      {videos.length===0 && 
      <Button onClick={()=>navigate('/upload-video')}>Upload your first Video</Button>}
    </>
  );
}

export default Channel;
