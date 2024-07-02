import React from 'react';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { Box, GlobalStyles } from '@mui/material';

const globalStyles = {
  body: {
    background: 'linear-gradient(to bottom, #aedcff, #ffffff)', // Updated gradient background
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
