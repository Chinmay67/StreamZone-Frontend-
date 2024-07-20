import { Stack, Typography, Button, Grid, styled, Divider, Box } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import VideoCard from '../VideoCard/VideoCard';
import { getChannelProfile } from '../../api/userService';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../Store/atoms/userAtoms';
import { useEffect, useState } from 'react';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',
}));

function Test() {
  const [currentUser, setCurrentUser] = useRecoilState(userAtom);
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const response = await getChannelProfile(currentUser, setCurrentUser);
      setChannel(response.data);
      console.log(response.data);
    };
    fetchChannel();
  }, [setCurrentUser]);

  return (
    <>
      <Box sx={{ width: "80%", margin: "10px auto", padding: "5px", borderRadius: "5px", backgroundColor: 'white' }}>
        <Box sx={{ position: 'relative', marginBottom: '20px' }}>
          <img
            src={channel.coverImage}
            height={300}
            width="100%"
            style={{ objectFit: 'fill', borderRadius: '10px' }}
            alt="Cover"
          />
          <Box sx={{ position: 'absolute', bottom: '-50px', left: '20px' }}>
            <Avatar
              src={channel.avatar}
              alt={channel.username}
              sx={{ width: 100, height: 100, border: '4px solid white', borderRadius: '50%' }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '50px' }}>
          <Box>
            <Typography variant="h4">{channel.username}</Typography>
            <Typography variant="h6">{channel.fullname}</Typography>
            <Typography variant="h6">{channel.subscribersCount} Subscribers</Typography>
          </Box>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#0a2a91', width: "150px" }}
            endIcon={<NotificationsNoneIcon />}
          >
            <Typography sx={{ display: { xs: "none", sm: "none", md: "block" } }}>Subscribe</Typography>
          </Button>
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

export default Test;
