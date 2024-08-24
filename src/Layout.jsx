// import React from 'react';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { Box, GlobalStyles } from '@mui/material';
import { useEffect } from 'react';
import { getCurrentUser } from './api/userService';
import { LocalLaundryService } from '@mui/icons-material';

const globalStyles = {
  body: {
    
    background: 'linear-gradient(135deg, #f9f9f9, #e6e6e6)',
    
    // background:'linear-gradient(135deg, #cfd9df, #e2ebf0)',
    







    minHeight: '100vh',
    margin: 0,
    padding: 0,
  },
};


function Layout() {
  
  return (
    <>
      <GlobalStyles styles={globalStyles} />
      <Box width='100%'>
        <Header />
        <Divider />
        <Outlet />
      </Box>
    </>
  );
}

export default Layout;
