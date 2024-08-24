// import React, { useEffect, useState } from 'react';
// import { Box, Grid } from "@mui/material";
// import VideoCard from "../VideoCard/VideoCard";
// import { getRandomVideos } from "../../api/videoService";

// function Homepage() {
//     const [videoResponse, setVideoResponse] = useState([]);

//     useEffect(() => {
//         const fetchVideos = async () => {
//             try {
//                 const response = await getRandomVideos();
//                 setVideoResponse(response);
//                 console.log(response);  // Debug: Ensure videos are fetched
//             } catch (error) {
//                 console.log("Error fetching videos", error);
//             }
//         };

//         fetchVideos();
//     }, []);

//     console.log(videoResponse);  // Debug: Ensure state is updated

//     return (
//         <Grid container spacing={0.2}>
//             {videoResponse.length > 0 && videoResponse.map((video, index) => (
//                 <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
//                     <VideoCard video={video} />
//                 </Grid>
//             ))}
//         </Grid>
//     );
// }

// export default Homepage;

import React, { useEffect, useState } from 'react';
import { Grid, Box } from "@mui/material";
import VideoCard from "../VideoCard/VideoCard";
import { getRandomVideos } from "../../api/videoService";

function Homepage() {
    const [videoResponse, setVideoResponse] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await getRandomVideos();
                setVideoResponse(response);
            } catch (error) {
                console.log("Error fetching videos", error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <Box 
            sx={{
                padding: "20px",
                overflow: "hidden",
            }}
        >
            <Grid 
                container 
                spacing={1.5}  // Space between video cards
                // justifyContent="center"  // Centering the grid content
            >
                {videoResponse.length > 0 && videoResponse.map((video, index) => (
                    <Grid 
                        item 
                        xs={12} 
                        sm={6} 
                        md={4} 
                        lg={3} 
                        xl={2.4} // Ensure 5 videos per row on full-size screens
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

export default Homepage;
