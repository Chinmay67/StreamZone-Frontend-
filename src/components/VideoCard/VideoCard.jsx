// import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {format} from 'timeago.js'
import { useRecoilState } from 'recoil';
import { videoAtom } from '../../Store/atoms/videoAtoms';
import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import { getVideoChannel } from '../../api/videoService';
// import { Stack } from '@mui/material';
function VideoCard(video) {

    const createdAt=format(video.video.createdAt)
    const navigate=useNavigate();
    const [currentVideo,setCurrentVideo]=useRecoilState(videoAtom)
    const handleVideoPlay=()=>{
        setCurrentVideo(video.video);
        console.log(currentVideo)
        navigate(`/play-video/${currentVideo._id}`)



    }
    return (
        <Card sx={{margin:"20px"}}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="250"
                image={video.video.thumbnail}
                onClick={handleVideoPlay}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div"
                 onClick={handleVideoPlay}>
                    {video.video.title}
                </Typography>

                
                
                <Typography variant="body2" color="text.secondary" onClick={() => navigate(`/OtherChannel/${video.video.owner.username}`)}>
                    {video.video.owner.username}    
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {video.video.views}||
                    {createdAt}
                </Typography>
                
            </CardContent>
           
        </Card>
    )
}

export default VideoCard
