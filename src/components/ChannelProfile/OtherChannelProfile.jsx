import React, { useEffect, useState } from 'react';
import { Avatar, Box, Divider, Grid, Typography, IconButton, Button } from '@mui/material';
import VideoCard from '../VideoCard/VideoCard';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOtherChannelProfile, fetchOtherChannelVideos } from '../../api/free';
import SubscribeButton from '../SubscribeButton/SubscribeButton';

function OtherChannelProfile() {
    const { channelName } = useParams();
    const [channel, setChannel] = useState(null);
    const [otherVideos, setOtherVideos] = useState(null);
    c
    useEffect(() => {
        const fetchOtherChannel = async (channelName) => {
            try {
                const response = await fetchOtherChannelProfile(channelName);
                setChannel(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchOtherChannel(channelName);
    }, [channelName]);

    useEffect(() => {
        const fetchOtherChannelVideo = async (channelName) => {
            try {
                const response = await fetchOtherChannelVideos(channelName);
                setOtherVideos(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOtherChannelVideo(channelName);
    }, [channelName]);

    return (
        <>
            <Box sx={{ width: "90%", maxWidth: 900, margin: "10px auto", padding: "5px", borderRadius: "5px", backgroundColor: 'white' }}>
                <Box sx={{ position: 'relative', marginBottom: '60px' }}>
                    <img
                        src={channel?.coverImage}
                        height={300}
                        width="100%"
                        style={{ objectFit: 'fill', borderRadius: '10px' }}
                        alt="Cover"
                    />
                </Box>

                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', marginTop: '-80px', paddingLeft: '20px', flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Avatar
                        src={channel?.avatar}
                        alt={channel?.username}
                        sx={{ width: 150, height: 150, border: '4px solid white', borderRadius: '50%', marginBottom: { xs: 2, sm: 0 } }}
                    />
                    <Box sx={{ marginLeft: { sm: '20px' }, textAlign: { xs: 'center', sm: 'left' } }}>
                        <Typography variant="h4">{channel?.username}</Typography>
                        <Typography variant="h6">@{channel?.fullname}</Typography>
                        <Typography variant="h6">{channel?.subscribersCount} Subscribers</Typography>
                    </Box>

                    <Box sx={{ position: { xs: 'static', sm: 'absolute' }, bottom: 0, right: 0, marginTop: { xs: 2, sm: 0 } }}>
                        <SubscribeButton id={channel?._id} />
                    </Box>
                </Box>
            </Box>

            <Divider orientation="horizontal" variant="middle" sx={{ margin: "30px" }} />

            <Grid container spacing={0.2}>
                {otherVideos?.length > 0 && otherVideos.map((video, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <VideoCard video={video} />
                    </Grid>
                ))}
                {otherVideos.length===0 &&
                <>No Videos Yet!!</>}
            </Grid>
        </>
    );
}

export default OtherChannelProfile;
