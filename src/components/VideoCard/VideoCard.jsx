// // import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import {format} from 'timeago.js'
// import { useRecoilState } from 'recoil';
// import { videoAtom } from '../../Store/atoms/videoAtoms';
// import { useNavigate } from 'react-router-dom';
// // import { useEffect } from 'react';
// // import { getVideoChannel } from '../../api/videoService';
// // import { Stack } from '@mui/material';
// function VideoCard(video) {

//     const createdAt=format(video.video.createdAt)
//     const navigate=useNavigate();
//     const [currentVideo,setCurrentVideo]=useRecoilState(videoAtom)
//     const handleVideoPlay=()=>{
//         setCurrentVideo(video.video);
//         console.log(currentVideo)
//         navigate(`/play-video/${currentVideo._id}`)



//     }
//     return (
//         <Card sx={{margin:"20px"}}>
//             <CardMedia
//                 component="img"
//                 alt="green iguana"
//                 height="250"
//                 image={video.video.thumbnail}
//                 onClick={handleVideoPlay}
//             />
//             <CardContent>
//                 <Typography gutterBottom variant="h5" component="div"
//                  onClick={handleVideoPlay}>
//                     {video.video.title}
//                 </Typography>

                
                
//                 <Typography variant="body2" color="text.secondary" onClick={() => navigate(`/OtherChannel/${video.video.owner.username}`)}>
//                     {video.video.owner.username}    
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                     {video.video.views}||
//                     {createdAt}
//                 </Typography>
                
//             </CardContent>
           
//         </Card>
//     )
// }

// export default VideoCard
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { format } from 'timeago.js';
import { useRecoilState } from 'recoil';
import { videoAtom } from '../../Store/atoms/videoAtoms';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

function VideoCard(video) {
    const createdAt = format(video.video.createdAt);
    const navigate = useNavigate();
    const [currentVideo, setCurrentVideo] = useRecoilState(videoAtom);

    const handleVideoPlay = () => {
        setCurrentVideo(video.video);
        navigate(`/play-video/${currentVideo._id}`);
    };

    return (
        <Card 
            sx={{
                margin: "10px", 
                boxShadow: "none", 
                backgroundColor: "transparent", // Removes background color
                borderRadius: "12px", 
                width: "100%", 
                overflow: "hidden",
                transition: "transform 0.3s ease-in-out",
                '&:hover': {
                    transform: "scale(1.02)",
                }
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: "5px" }}>
                <CardMedia
                    component="img"
                    alt={video.video.title}
                    height="160"
                    image={video.video.thumbnail}
                    onClick={handleVideoPlay}
                    sx={{
                        cursor: "pointer",
                        transition: "transform 0.3s ease-in-out",
                        borderRadius: "12px", // Keeps the image's border radius
                        '&:hover': {
                            transform: "scale(1.1)",
                            zIndex: 1,
                        }
                    }}
                />
            </Box>
            <CardContent 
                sx={{ 
                    padding: "10px",
                    backgroundColor: "transparent", // Removes background color of CardContent
                }}
            >
                <Typography 
                    gutterBottom 
                    variant="h6" 
                    component="div"
                    onClick={handleVideoPlay}
                    sx={{
                        cursor: "pointer",
                        fontWeight: "bold",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        "&:hover": {
                            textDecoration: "underline",
                        }
                    }}
                >
                    {video.video.title}
                </Typography>
                <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    onClick={() => navigate(`/OtherChannel/${video.video.owner.username}`)}
                    sx={{
                        cursor: "pointer",
                        "&:hover": {
                            textDecoration: "underline",
                        }
                    }}
                >
                    {video.video.owner.username}
                </Typography>
                <Typography 
                    variant="body2" 
                    color="text.secondary"
                >
                    {video.video.views} views • {createdAt}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default VideoCard;
