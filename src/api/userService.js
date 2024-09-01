// frontend/src/api/userService.js

import { useRecoilState } from 'recoil';
import { userAtom } from '../Store/atoms/userAtoms';
import axios from './axios'; // Import the configured Axios instance

// export const GetUserProfile = async () => {
//     const [currentUser, setCurrentUser] = useRecoilState(userAtom);
//     const userId=localStorage.getItem('userID')
//     try {
//         if(!currentUser && userId){
//             const response = await axios.get('/users/profile');
//             setCurrentUser(response.data.user)
//             return response.data.user;
//         }
        
//     } catch (error) {
//         console.error('Error fetching user profile:', error);
//         return null;
//     }
// };

export const RegisterUser=async(formData)=>{
    
    try {
        const postNewUser=await axios.post('/users/register',
            formData,{
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            
            }
            
        )
        // console.log("user uploaded successfully",postNewUser.data)
        return postNewUser.data;
       
      } catch (error) {
        // console.log(error)
        return error.response
      }
      
     
}

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post('/users/login', { email, password });
        console.log("user logged in sucessfully", response.data)
        return response.data;
    } catch (error) {
        // console.error('Error logging in:', error);
        // throw error;
        return error.response
    }
};
export const CurrentUser=async()=>{
    try {

        const response=await axios.get('/users/current-user') 
        console.log('getting current user',response.data)
        return response.data.data
    } catch (error) {
        console.log(error)
        // throw Error(error)
        return null
    }
}
export const getCurrentUser=async()=>{
    try{
        const status=await axios.get('/users/check-token')
        // console.log(status)
        if(status.data.data==true){
            try {

                const response=await axios.get('/users/current-user') 
                console.log('getting current user',response.data)
                return response.data.data
            } catch (error) {
                // console.log(error)
                return null
            }
        }
        else{
            // console.log(status,"response")
            return null
        }
    }catch(error){
        // console.log(error)
    }
   
}

export const refreshAccessToken = async () => {
    try {
        const response = await axios.post('/users/refresh-token');
        const { accessToken } = response.cookie;

        // No need to store the access token since it's managed via HTTP-only cookies

        return accessToken;
    } catch (error) {
        // console.error('Error refreshing access token:', error);
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


// export const refreshUser=async(currentUser,setCurrentUser)=>{
//     if(!currentUser){
//         const userProfile=await getCurrentUser()
//         setCurrentUser(userProfile)
//     }
//     else{
//         return;
//     }
// }

export const getChannelProfile=async(currentUser,setCurrentUser)=>{
    if(currentUser===null){
       try {
        const response=await  getCurrentUser()
        console.log("response in getting", response)
        setCurrentUser(response)
        console.log(currentUser)
        // return response.data
       } catch (error) {
        console.log("error" ,error)
       }
    }
    try {
        const response=await axios.get(`/users/c/${currentUser.username}`);
        console.log('respone in get channel profile',response)
        return response.data.data;
    } catch (error) {
        console.log("error" ,error)
        return null;
    }
}

export const toggleChannelSubscription=async(channelId)=>{
    console.log(channelId)
    try {
        const response=await axios.post(`/subscriptions/c/${channelId}`)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const checkUserSubscription=async(channelId)=>{
    console.log(channelId)
    try {
        const response=await axios.get(`/subscriptions/subscriptionStatus/${channelId}`)
        return response.data.data
    } catch (error) {
        console.log(error)
    }
}

export const getUserSubscriptions=async()=>{
    try {
        const response=await axios.get("/subscriptions/user-subscriptions")
        return response.data.data
    } catch (error) {
        return error
    }
}
// Add more functions as needed
