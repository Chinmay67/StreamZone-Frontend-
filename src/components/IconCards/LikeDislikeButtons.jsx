import React, { useState, useEffect } from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { IconButton } from '@mui/material';
import { ToggleVideoLike } from '../../api/videoService';
import { toggleCommentLike } from '../../api/commentService';
import { useRecoilState, useRecoilValue } from 'recoil';
import { checkUser } from '../../Store/atoms/userAtoms';

function LikeCard({ id, isLiked, type, onToggleLike }) {
  const [likeState, setLikeState] = useState(isLiked?.likeType === 'like' ? 1 : 0);
  const userStatus=useRecoilValue(checkUser)
  // console.log(id)
  // console.log(isLiked)
  // console.log(type)
  const handleClick = async () => {
    const likeType = 'like';
    setLikeState(1); // Update the state locally

    try {
      const response = type === 'video'
        ? await ToggleVideoLike(id, likeType)
        : await toggleCommentLike(id, likeType);
      onToggleLike(response); // Pass the updated like state to the parent component
    } catch (error) {
      console.error(error);
      setLikeState(0)
    }
  };

  useEffect(() => {
    setLikeState(isLiked?.likeType === 'like' ? 1 : 0);
    // console.log(isLiked)
    // 
  }, [isLiked]);
  // useEffect(()=>{
  //   console.log(likeState)
  // },[likeState])

  return (
    <IconButton color={likeState === 1 ? 'primary' : 'default'} onClick={handleClick} disabled={userStatus ===true ? false : true }>
      <ThumbUpIcon />
    </IconButton>
  );
}

function DislikeCard({ id, isLiked, type, onToggleDislike }) {
  const [likeState, setLikeState] = useState(isLiked?.likeType === 'dislike' ? 1 : 0);
  const userStatus=useRecoilValue(checkUser)
  // console.log(id)
  // console.log(isLiked)
  // console.log(type)
  
  const handleClick = async () => {
    const likeType = 'dislike';
    setLikeState(1); // Update the state locally

    try {
      const response = type === 'video'
        ? await ToggleVideoLike(id, likeType)
        : await toggleCommentLike(id, likeType);
      onToggleDislike(response); // Pass the updated dislike state to the parent component
    } catch (error) {
      console.error(error);
      setLikeState(0);
    }
  };

  useEffect(() => {
    setLikeState(isLiked?.likeType === 'dislike' ? 1 : 0);
    // console.log(isLiked)
  }, [isLiked]);
  // useEffect(()=>{
  //   console.log(likeState)
  // },[likeState])
  return (
    <IconButton color={likeState === 1 ? 'primary' : 'default'} onClick={handleClick} disabled={userStatus ===true ? false : true }>
      <ThumbDownIcon />
    </IconButton>
  );
}

export { LikeCard, DislikeCard };
