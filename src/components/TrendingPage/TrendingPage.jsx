import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import VideoCard from '../VideoCard/VideoCard';
import { getTrendingVideos } from '../../api/videoService';

function TrendingPage() {
  
    const [videoResponse, setVideoResponse] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await getTrendingVideos();
                setVideoResponse(response);
                console.log(response);  // Debug: Ensure videos are fetched
            } catch (error) {
                console.log("Error fetching videos", error);
            }
        };

        fetchVideos();
    }, []);

    console.log(videoResponse);  // Debug: Ensure state is updated

    return (
        <Grid container spacing={0.2}>
            {videoResponse.length > 0 && videoResponse.map((video, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <VideoCard video={video} />
                </Grid>
            ))}
        </Grid>
    );
  
}

export default TrendingPage
