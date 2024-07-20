import { Box, Button } from '@mui/material'
// import React from 'react'
import { Link } from 'react-router-dom'
function SignupLoginButton() {
  return (
    <div>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2}}>
            <Button
              component={Link}
              to='/signup'
              variant="contained"
              sx={{ 
                

                backgroundColor: '#55c2da', 
                color: '#fff', 
                '&:hover': { backgroundColor: '#4681f4' },
                textTransform: 'none'
              }}
            >
              Sign Up / Login
            </Button>
        </Box>
    </div>
  )
}

export default SignupLoginButton
