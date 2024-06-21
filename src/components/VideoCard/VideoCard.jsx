// import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
function VideoCard() {
    return (
        <Card sx={{margin:"20px"}}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="250"
                image="http://res.cloudinary.com/ds23bhkcd/image/upload/v1713597990/bqk2xmrvw2erp6ly60sv.jpg"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Title
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Channel Name
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Views||Time
                </Typography>
                
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                
            </CardActions>
        </Card>
    )
}

export default VideoCard
