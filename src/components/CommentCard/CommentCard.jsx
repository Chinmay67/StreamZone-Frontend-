import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Avatar, Box, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { format } from 'timeago.js';
import { useRecoilValue } from 'recoil';
import { checkUser } from '../../Store/atoms/userAtoms';
import { DislikeCard, LikeCard } from '../IconCards/LikeDislikeButtons';
import { CheckCommentLike } from '../../api/commentService';

function CommentCard({ comment }) {
  const userStatus=useRecoilValue(checkUser)
  const comments="comment"
  const [liked,setLiked]=useState(null);
  
  useEffect(()=>{
    const fetchCommentLike=async(id,userStatus)=>{
      if(userStatus){
        try {
          const response=await CheckCommentLike(id)
          // console.log(response)
          setLiked(response)
          // console.log(liked)
        } catch (error) {
          console.log(error)
        }
        
      }
    }
    fetchCommentLike(comment._id,userStatus)
  },[])
  return (
    <Card sx={{ marginBottom: 1, padding: 1, backgroundColor: '#F5F5F5', borderRadius: 2 }}>
      <CardContent sx={{ padding: '8px 12px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 30, height: 30, marginRight: 1 }} src={comment?.owner?.avatar} />
            <Box>
              <Typography variant="subtitle2" fontWeight="bold">
                {comment?.owner?.username}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {format(comment?.createdAt)}
              </Typography>
            </Box>
          </Box>
          <Box>
            {/* <IconButton size="small" color="primary">
              <ThumbUpIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="secondary">
              <ThumbDownIcon fontSize="small" />
            </IconButton> */}
            <LikeCard id={comment._id} isLiked={liked} type={comments} onToggleLike={(newLiked) => setLiked(newLiked)}  />
            <DislikeCard id={comment._id} isLiked={liked} type={comments} onToggleDislike={(newLiked) => setLiked(newLiked)} />
                    
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
          {comment?.content}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CommentCard;
