import  { useEffect, useState } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout.jsx';
import Signup from './components/Signup/Signup.jsx';
import Login from './components/Login/Login.jsx';
import ChannelProfile from './components/ChannelProfile/ChannelProfile.jsx';
import Homepage from './components/VideoDisplay/Homepage.jsx';
import { useRecoilState } from 'recoil';
import {  getCurrentUser } from './api/userService.js';
import { checkUser, userAtom } from './Store/atoms/userAtoms.jsx';
// import Test from './components/ChannelProfile/Test.jsx';
// import UploadPage from './components/UploadPage/UploadPage.jsx';
import { Box, CircularProgress } from '@mui/material';
import Upload from './components/UploadPage/Upload.jsx';
// import VideoPlay from './components/VideoPlay/VideoPlay.jsx';
// import VideoView from './components/VideoPlay/VideoView.jsx';
import VideoPlay from './components/VideoPlay/VideoPlay.jsx';
import VideoView from './components/VideoPlay/VideoView.jsx';
import OtherChannelProfile from './components/ChannelProfile/OtherChannelProfile.jsx';
import TrendingPage from './components/TrendingPage/TrendingPage.jsx';
import Studio from './components/Studio/Studio.jsx';
import EditVideo from './components/Studio/EditVideo/EditVideo.jsx';
// import TrendingPage from './components/Sidebar/TrendingPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Homepage />} />
      <Route path='channel' element={<ChannelProfile />} />
      <Route path='signup' element={<Signup />} />
      <Route path='login' element={<Login />} />
      <Route path='upload-video' element={<Upload/>} />
      <Route path='trending' element={<TrendingPage/>}/>
      <Route path='play-video/:id' element={<VideoView/>}/>
      <Route path='play-video' element={<Homepage/>}/>
      <Route path='OtherChannel/:channelName' element={<OtherChannelProfile/>}/>
      <Route path='studio' element={<Studio/>}/>
      <Route path='studio/edit-videos' element={<EditVideo/>}/>
      {/* <Route path='otherProfile' element={<OtherChannel/>}/> */}
    </Route>
  )
);

function App() {
  // const navigate=useNavigate()
  const [currentUser, setCurrentUser] = useRecoilState(userAtom);
  const [checkUserState, setCheckUser] = useRecoilState(checkUser);
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)

      try{
        
        const user = await getCurrentUser();
        setCurrentUser(user)
        if(user===null){
          setCheckUser(false)
        }
        else{
          setCheckUser(true)
        }
      }
      catch(error){
        console.log(error);

        setCheckUser(false)
        
        // console.error=()=>{}

      }finally{
        setLoading(false)
        
      }
    }
    fetchUser();
    // setCheckUser(false)
      
  }, [setCheckUser, setCurrentUser])

  useEffect(() => {
    console.log("checkUserState:", checkUserState);
    console.log("currentUser:", currentUser);
  }, [checkUserState, currentUser]);
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <RouterProvider router={router} />
    // <UploadPage/>
    // <Test/>
    // <VideoPlay/>
  );
}

export default App;
