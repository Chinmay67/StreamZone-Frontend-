import { Avatar, Box, Button, Card, CardContent, CardMedia, Divider, Grid, IconButton, List, ListItem, ListItemText, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState,useRef } from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRecoilState } from 'recoil';
import { videoAtom } from '../../Store/atoms/videoAtoms';
import { format } from 'timeago.js';
// import horizontalVideoCard from '../VideoCard/horizontalVideoCard';
import HorizontalVideoCard from '../VideoCard/HorizontalVideoCard';
import { CheckVideoLike, getRandomVideos, getVideoById, incrementVideoView } from '../../api/videoService';
import { useParams,  useNavigate } from 'react-router-dom';
import { checkUser, userAtom } from '../../Store/atoms/userAtoms';
import SignupLoginButton from '../signupLoginButton/SignupLoginButton';
import { getVideoComments, postNewComment } from '../../api/commentService';
import CommentCard from '../CommentCard/CommentCard';
// import LikeCard from '../IconCards/LikeCard';


// import DislikeCard from '../IconCards/DislikeCard';

import { LikeCard,DislikeCard } from '../IconCards/LikeDislikeButtons';
import SubscribeButton from '../SubscribeButton/SubscribeButton';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00bcd4', // Blue color
    },
    secondary: {
      main: '#8bc34a', // Green color
    },
    background: {
      default: '#e0f7fa', // Light blue-green background
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          margin: '0 8px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          marginBottom: '16px',
        },
      },
    },
  },
});
function VideoPlay() {
   
      const [currentVideo,setCurrentVideo]=useRecoilState(videoAtom)
      // const [currentUser,setCurrentUser]=useRecoilState(userAtom)
      const [commentCreated,setCommentCreated]=useState(false)
      const [createdAt,setCreateAt]=useState('');
      const video="video"
      const videoRef = useRef(null);
      const [videoResponse, setVideoResponse] = useState([]);
      const [comments,setComments]=useState([])
      const [userStatus,setUserStatus]=useRecoilState(checkUser)
      const [newComment, setNewComment]=useState('')
      const [liked,setLiked]=useState(null);
      const {id}=useParams();
      // console.log(id)
      const navigate=useNavigate()
      // const history= useHistory();
      if(!id){
        navigate('/')
      }
      const fetchComments=async(id)=>{
        try {
          const response=await getVideoComments(id);
          // console.log(response);
          setComments(response)
          console.log(comments)
        }
        catch(error){
          console.log(error)
        }
      }
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await getRandomVideos();
                setVideoResponse(response);
                // console.log("suggestions",response);  // Debug: Ensure videos are fetched
            } catch (error) {
                console.log("Error fetching videos", error);
            }
        };

        fetchVideos();
    }, [setVideoResponse]);
    useEffect(()=>{
      const fetchCurrentVideo=async(id)=>{
        try {
          const response=await getVideoById(id);
          console.log(response)
          setCurrentVideo(response)
          // console.log(currentVideo)
          
        } catch (error) {
          console.log(error)
        }
      }
      const fetchVideoLike=async(id,userStatus)=>{
        if(userStatus){
          try {
            const response=await CheckVideoLike(id)
            console.log(response)
            setLiked(response)
            console.log(liked)
          } catch (error) {
            console.log(error)
          }
          
        }
      }
      
      if(id ){
        try {
          fetchVideoLike(id,userStatus)
          // console.log("id after reload",id)
          fetchCurrentVideo(id)
          // console.log(currentVideo)
          const created=format(currentVideo?.createdAt)
          setCreateAt(created) 
        } catch (error) {
          console.log(error)
        }
      }
      
    },[id,setCurrentVideo,setLiked,userStatus])
    useEffect(()=>{
      
     if(commentCreated){
      fetchComments(id)
      setCommentCreated(false)
     }
     fetchComments(id)
      
      
    },[id,commentCreated])
    
      
     const handleAddComment=async(e)=>{
      e.preventDefault()
      try {
        console.log(newComment)
        const commentData = { content: newComment };
        
        const response=await postNewComment(commentData,id)
        setCommentCreated(true)
        setNewComment('')
        // await fetchComments(id,setComments)

        console.log(response)
      } catch (error) {
        console.log(error)
        setCommentCreated(false)
      }

     }
     useEffect(()=>{
      console.log(liked)

     },[liked])
    useEffect(() => {
      if(userStatus){
        const videoElement = videoRef.current;
      let watchedTime = 0;
      let lastTime = 0;
  
      const handleTimeUpdate = () => {
        // Calculate watched time
        if (videoElement.currentTime > lastTime) {
          watchedTime += videoElement.currentTime - lastTime;
        }
        lastTime = videoElement.currentTime;
        const updateViewCount = async (videoId) => {
          try {
            // API call to update view count
            await incrementVideoView(videoId);  // Replace with your API call for updating views
          } catch (error) {
            console.log("Error updating view count", error);
          }
        };
        // If 50% of the video has been watched, update view count
        if (watchedTime >= videoElement.duration * 0.5) {
          updateViewCount(currentVideo._id);
          videoElement.removeEventListener('timeupdate', handleTimeUpdate); // Stop tracking
        }
       
      }
        videoElement.addEventListener('timeupdate', handleTimeUpdate);
    
        return () => {
          videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        };
      }
      
    }, [id,userStatus]);
      
    
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ padding: 2, backgroundColor: theme.palette.background.default }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box>
            <Card>
              <CardMedia
                component="video"
                controls
                ref={videoRef}
                src={currentVideo?.videoFile} // Replace with actual video source
                title={currentVideo?.title}
              />
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5">{currentVideo?.title}</Typography>
                  <Box>
                    {/* <LikeCard id={id} isLiked={liked} type={video} />
                    <DislikeCard  id={id} isLiked={liked} type={video}/> */}
                  
                 
                      <LikeCard id={id} isLiked={liked} type={video} onToggleLike={(newLiked) => setLiked(newLiked)} disabled />
                      <DislikeCard id={id} isLiked={liked} type={video} onToggleDislike={(newLiked) => setLiked(newLiked)} disabled/>
                    

                      
                    <SubscribeButton id={currentVideo?.owner?._id} />
                  </Box>
                </Box>
                <Stack direction='row' spacing={1}>
            
               <Avatar
                    src={currentVideo?.owner.avatar}
                    sx={{ width: 30, height: 30 }}
                    
                  />
                  <Typography variant="h6" color="text.secondary" onClick={()=>navigate(`/OtherChannel/${currentVideo?.owner.username}`)}>
                   
                   {currentVideo?.owner.username}
                
                 </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                  {currentVideo?.views} | {createdAt}
                </Typography>
                <Divider/>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  {currentVideo?.description}
                </Typography>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', marginY: 2 }}>
                    {userStatus===true ? (<>
                      <TextField
                        label="Add a comment"
                        variant="filled"
                        multiline
                        onChange={e=>setNewComment(e.target.value)}
                        value={newComment}
                        sx={{ marginBottom: 2 }}
                      />
                      <Button onClick={handleAddComment} variant="contained" color="primary">Submit</Button>
                      </>
                    ):(
                      <SignupLoginButton/>
                    )}
                </Box>
                {comments.length===0 ?(
                  <Typography variant="h5" color="text.primary" sx={{ margin:'auto'}}>No Comments Yet!!</Typography>
                ):(
                 <>
                  {comments.map((comment, index) => (
                    <CommentCard key={index} comment={comment}/>
                  ))}
                  </>
               
                )}
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
        
          <Box>
          {videoResponse.map((suggestion, index) => (
            <HorizontalVideoCard
              key={index}
              suggestion={suggestion}
            />
          ))}
        </Box>
      
        </Grid>
      </Grid>
    </Box>
  </ThemeProvider>
  )
}

export default VideoPlay
