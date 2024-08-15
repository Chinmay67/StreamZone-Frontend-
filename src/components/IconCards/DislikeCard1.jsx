import React, { useState } from 'react'
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { IconButton } from '@mui/material';
import { ToggleVideoLike } from '../../api/videoService';
import { toggleCommentLike } from '../../api/commentService';
function DislikeCard({id, isLiked, type}) {
  const [liked,setLiked]=useState(isLiked)
  const [likeState,setLikeState]=useState(0)
    console.log(liked)
  // console.log(id)
  const likeType="dislike"
  if(liked=={} ){
    setLikeState(0)
  }
  else if(liked?.data?.likeType==="dislike"){
    setLikeState(1)
  }
  // console.log(type)
  const handleClick=async()=>{
    if(type==="video"){
      const response=await ToggleVideoLike(id,likeType);
      setLiked(response)
      // console.log(response)
    }
    else if(type==="comment"){
      const response=await toggleCommentLike(id,likeType)
      setLiked(response)
      // console.log(response)
    }
  }

  return (
    <div onClick={handleClick}>
        {likeState==1 &&
            <IconButton color="primary"  >
                <ThumbDownIcon/>
            </IconButton>
        } 
        {likeState==0 && 
        <IconButton >
            <ThumbDownIcon/>
        </IconButton>
        }
        
    
    </div>
    
  )
}

export default DislikeCard
