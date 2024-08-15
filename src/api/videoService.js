import axios from './axios';

export const uploadVideo = async (formData, onUploadProgress) => {
  try {
    const response = await axios.post(
      '/videos/upload-videos',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: onUploadProgress
      }
    );
    console.log('Video Uploaded Successfully');
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getUserVideos=async()=>{
  try {
    const response=await axios.get('/videos/get-User-Videos')
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export const getRandomVideos=async()=>{
  try {
    const response = await axios.get('/free/get-videos');
    return response.data.data;
    // console.log(response)
  }
  catch(error){
    console.log(error)
  }
}

export const getVideoChannel=async(formData)=>{
  try {
    const response=await axios.get('/free/get-username',formData);
    return response

  } catch (error) {
    return error   
  }
}

export const getVideoById=async(id)=>{
  try {
    console.log("id from fucntion",id)
    const response =await axios.get(`/free/${id}`)
    return response.data.data

  } catch (error) {
    console.log(error)
  }
}

export const CheckVideoLike=async(id)=>{
  try {
    const response=await axios.get(`/likes/check/v/${id}`)
    return response.data.data
  } catch (error) {
    console.log(error)
  }
}
export const ToggleVideoLike=async(id,likeType)=>{
  try {
    const response=await axios.post(`/likes/toggle/v/${id}`,{likeType})
    return response.data.data
  } catch (error) {
    console.log(error)
  }
}


export const incrementVideoView=async(videoId)=>{
  try {
    await axios.get(`/videos/incrementViews/${videoId}`)
    // return response
  } catch (error) {
    console.log(error)
  }
}

