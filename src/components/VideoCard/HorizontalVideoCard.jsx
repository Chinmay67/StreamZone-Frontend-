import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { format } from 'timeago.js';
import { useRecoilState } from 'recoil';
import { videoAtom } from '../../Store/atoms/videoAtoms';
import { useNavigate } from 'react-router-dom';

const HorizontalVideoCard = ({ suggestion }) => {
  const { createdAt, title, thumbnail, owner, views } = suggestion;
  const formattedDate = format(createdAt);
  const [currentVideo , setCurrentVideo]=useRecoilState(videoAtom)
  const navigate=useNavigate()
  const handleVideoPlay=()=>{
    setCurrentVideo(suggestion);
    console.log(currentVideo)
    navigate(`/play-video/${currentVideo._id}`)



}
  return (
    <Card sx={{ display: 'flex', marginBottom: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 150 , height:150 }}
        image={thumbnail}
        alt={title}
        onClick={handleVideoPlay}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 1 }}>
        <Typography variant="body1">{title}</Typography>
        <Typography variant="body2" color="text.secondary" >{owner.username}</Typography>
        <Typography variant="body2" color="text.secondary">{views} | {formattedDate}</Typography>
      </Box>
    </Card>
  );
};

export default HorizontalVideoCard;