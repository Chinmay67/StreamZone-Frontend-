// import React from 'react'
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'

// import Outline from './components/Outline/Outline'
import Sidebar from './components/Sidebar/Sidebar'
import { Box, Stack } from '@mui/material'
import Divider from '@mui/material/Divider';
function Layout() {
    return (
        <>
            <Header/>
          
                
                    
            
            <Divider/>
            <Outlet/>
            
                    
                
            
        </>
                
    )
}

export default Layout
