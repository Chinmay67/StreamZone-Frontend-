import  { useEffect } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout.jsx';
import Signup from './components/Signup/Signup.jsx';
import Login from './components/Login/Login.jsx';
import ChannelProfile from './components/ChannelProfile/ChannelProfile.jsx';
import Homepage from './components/VideoDisplay/Homepage.jsx';
import { useRecoilState } from 'recoil';
import { getCurrentUser } from './api/userService.js';
import { checkUser, userAtom } from './Store/atoms/userAtoms.jsx';
import Test from './components/ChannelProfile/Test.jsx';
import UploadPage from './components/UploadPage/UploadPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Homepage />} />
      <Route path='channel' element={<ChannelProfile />} />
      <Route path='signup' element={<Signup />} />
      <Route path='login' element={<Login />} />
      {/* <Route path='otherProfile' element={<OtherChannel/>}/> */}
    </Route>
  )
);

function App() {
  const [currentUser, setCurrentUser] = useRecoilState(userAtom);
  const [checkUserState, setCheckUser] = useRecoilState(checkUser);

  useEffect(() => {
    const fetchUser = async () => {
      try{
        const user = await getCurrentUser();
        setCurrentUser(user)
        setCheckUser(true);
      }
      catch(error){
        console.log(error);
        setCheckUser(false)

      }
    }
    fetchUser();
      
  }, [setCheckUser, setCurrentUser])

  useEffect(() => {
    console.log("checkUserState:", checkUserState);
    console.log("currentUser:", currentUser);
  }, [checkUserState, currentUser]);

  return (
    <RouterProvider router={router} />
    // <UploadPage/>
    // <Test/>
  );
}

export default App;
