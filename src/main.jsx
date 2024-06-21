import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
// import Header from './components/header/header'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'

import Signup from './components/Signup/Signup.jsx'
import Login from './components/Login/Login.jsx'
import ChannelProfile from './components/ChannelProfile/ChannelProfile.jsx'
import Homepage from './components/VideoDisplay/Homepage.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Homepage/>}/>
      <Route path='channel' element={<ChannelProfile />} />
      <Route path='signup' element={<Signup/>}/>
      <Route path='login' element={<Login/>}/>
    </Route>
      
  )
) 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <Signup/> */}
    {/* <ChannelProfile/> */}
  </React.StrictMode>,
)
