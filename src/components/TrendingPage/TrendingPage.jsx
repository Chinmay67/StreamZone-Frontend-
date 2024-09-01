import { Box, Grid } from '@mui/material';
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
        <Box 
            sx={{
                padding: "20px",
                overflow: "hidden",
            }}
        >
            <Grid 
                container 
                spacing={1.5}  
                // justifyContent="center"  
            >
                {videoResponse.length > 0 && videoResponse.map((video, index) => (
                    <Grid 
                        item 
                        xs={12} 
                        sm={6} 
                        md={4} 
                        lg={3} 
                        xl={2.4} 
                        key={index}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <VideoCard video={video} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
  
}

export default TrendingPage
