// import { useState } from 'react'

import { AppBar, CssBaseline, Toolbar, Typography } from '@mui/material'
import PauseCircleFilledOutlinedIcon from '@mui/icons-material/PauseCircleFilledOutlined';

import './App.css'

function App() {
  

  return (
    <>
      <CssBaseline/>
      <AppBar position='relative'>
        <Toolbar>
          <PauseCircleFilledOutlinedIcon/>
          <Typography variant='h6'>
            VideoTube
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default App
