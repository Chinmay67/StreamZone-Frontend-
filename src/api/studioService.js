// import { thumbnail } from '@cloudinary/url-gen/actions/resize'
import axios from './axios'

export const editVideoDetails=async(videoId,details)=>{
    try {
        const response=await axios.patch(`/videos/update-video-details/${videoId}`,details)
        return response
    } catch (error) {
        return error
    }
}

export const DeleteVideo=async(videoId)=>{
    try{
        const response=await axios.delete(`/videos/${videoId}`)
        return response
    }
    catch(error){
        return error
    }
}

export const EditVideoThumbnail=async(videoId,thumbnail) => {
    try {
      
        const response=await axios.patch(`/videos/${videoId}`,thumbnail,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response
    } catch (error) {
        return error
    }
}


export const editChannelDetails=async(details)=>{
    try {
        const response=await axios.patch("/users/update-account",details)
        return response;
    } catch (error) {
        return error;
    }
}

export const editUserAvatar=async(avatar)=>{
    try {
        const response=await axios.patch("/users/avatar",avatar,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response
    } catch (error) {
        return error
    }
}

export const editUserCoverImage=async(coverImage)=>{
    try {
        const response=await axios.patch("/users/coverImage",coverImage,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response
    } catch (error) {
        return error
    }
}

export const getChannelStats=async()=>{
    try {
       const response=await axios.get("/stats/studio/channel-stats")
       return  response.data.data 
    } catch (error) {
        return error
    }
}