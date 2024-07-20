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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Homepage />} />
      <Route path='channel' element={<ChannelProfile />} />
      <Route path='signup' element={<Signup />} />
      <Route path='login' element={<Login />} />
      <Route path='otherProfile' element={<OtherChannel/>}/>
    </Route>
  )
);

function App() {
  const [currentUser, setCurrentUser] = useRecoilState(userAtom);
  const [checkUserState, setCheckUser] = useRecoilState(checkUser);

  useEffect(() => {
    const fetchUser = async () => {
      const userID = localStorage.getItem("userID");
      if (userID) {
        try {
          const user = await getCurrentUser();
          if (user) {
            setCurrentUser(user);
            setCheckUser(true);
          } else {
            setCheckUser(false);
          }
        } catch (error) {
          console.log(error);
          setCheckUser(false);
        }
      }  
    };

    fetchUser();
  }, [setCheckUser, setCurrentUser]);

  useEffect(() => {
    console.log("checkUserState:", checkUserState);
    console.log("currentUser:", currentUser);
  }, [checkUserState, currentUser]);

  return (
    <RouterProvider router={router} />
    // <Test/>
  );
}

export default App;
