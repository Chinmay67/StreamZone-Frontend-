// frontend/src/api/userService.js

import axios from './axios'; // Import the configured Axios instance

export const getUserProfile = async () => {
    try {
        const response = await axios.get('/users/profile');
        return response.data.user;
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

export const refreshAccessToken = async () => {
    try {
        const response = await axios.post('/users/refresh-token');
        return response.data.accessToken;
    } catch (error) {
        console.error('Error refreshing access token:', error);
        return null;
    }
};

// Add more functions as needed
