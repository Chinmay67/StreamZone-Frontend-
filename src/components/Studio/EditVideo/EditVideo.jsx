import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { checkUser } from '../../../Store/atoms/userAtoms'
import SignupLoginButton from '../../signupLoginButton/SignupLoginButton'
import { getUserVideos } from '../../../api/videoService'
import { Box, Button, Stack } from '@mui/material'
import HorizontalVideoCard from '../../VideoCard/HorizontalVideoCard'
// import { WidthFull } from '@mui/icons-material'

function EditVideo() {
    const userStatus=useRecoilValue(checkUser)
    const [videos,setVideos]=useState([])
    useEffect(()=>{
        const fetchUserVideos=async()=>{
            if(userStatus){
                try {
                    const response=await getUserVideos();
                    console.log(response)
                    setVideos(response.data)

                } catch (error) {
                    console.log(error)
                }
            }
        }
        fetchUserVideos();

    },[userStatus])
  return (
    <>
    {userStatus==true ?(
        <>
        <Box sx={{width:'50%'}}>
          {videos.map((suggestion, index) => (
            
            <HorizontalVideoCard
              key={index}
              suggestion={suggestion}
              
            />
            
           
          ))}
        </Box>
        </>
    ):(<SignupLoginButton/>)}
    </>
  )
}

export default EditVideo
