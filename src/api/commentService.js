import axios from './axios';

export const getVideoComments=async(videoId)=>{
   try {
     const response=await axios.get(`/free/comments/${videoId}`)
     return response.data.data
   } catch (error) {
    console.log( error);
   }
}

export const postNewComment=async(commentData,id)=>{
  try {
    const response=await axios.post(`/comments/${id}`,commentData)
    return response.data
  }catch(error){
    console.log(error);
  }
}
export const CheckCommentLike=async(id)=>{
  try {
    const response=await axios.get(`/likes/check/c/${id}`)
    return response.data.data
  } catch (error) {
    console.log(error)
  }
}


export const toggleCommentLike=async(id,likeType)=>{
  try {
    const response=await axios.post(`/likes/toggle/c/${id}`,{likeType})
    return response.data.data
  } catch (error) {
    console.log(error)
  }
}


