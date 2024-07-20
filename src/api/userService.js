// frontend/src/api/userService.js

import { useRecoilState } from 'recoil';
import { userAtom } from '../Store/atoms/userAtoms';
import axios from './axios'; // Import the configured Axios instance

export const GetUserProfile = async () => {
    const [currentUser, setCurrentUser] = useRecoilState(userAtom);
    const userId=localStorage.getItem('userID')
    try {
        if(!currentUser && userId){
            const response = await axios.get('/users/profile');
            setCurrentUser(response.data.user)
            return response.data.user;
        }
        
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }
};

export const RegisterUser=async(formData)=>{
    
    try {
        const postNewUser=await axios.post('users/register',
            formData,{
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            
            }
            
        )
        console.log("user uploaded successfully",postNewUser.data)
        return postNewUser.data;
       
      } catch (error) {
        console.log(error)
      }
      
     
}

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post('/users/login', { email, password });
        console.log("user logged in sucessfully", response.data)
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const getCurrentUser=async()=>{
    try {

        const response=await axios.get('/users/current-user') 
        return response.data
    } catch (error) {
        return error.message
    }
}

export const refreshAccessToken = async () => {
    try {
        const response = await axios.post('/users/refresh-token');
        const { accessToken } = response.data;

        // No need to store the access token since it's managed via HTTP-only cookies

        return accessToken;
    } catch (error) {
        console.error('Error refreshing access token:', error);
        return null;
    }
};

export const logoutUser=async()=>{
    try {
        const response=await axios.post('/users/logout');
        localStorage.removeItem("userID")
        
        return response;
    } catch (error) {
        console.error('error logging out user' , error)
    }
}


export const refreshUser=async(currentUser,setCurrentUser)=>{
    if(!currentUser){
        const userProfile=getCurrentUser()
        setCurrentUser(userProfile)
    }
    else{
        return;
    }
}

export const getChannelProfile=async(currentUser,setCurrentUser)=>{
    if(!currentUser){
        await refreshUser(currentUser,setCurrentUser)
    }
    try {
        const response=await axios.get(`/users/c/${currentUser.data.username}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
// Add more functions as needed
