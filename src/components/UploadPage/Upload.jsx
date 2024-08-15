import React from 'react'
import UploadPage from './UploadPage'
import SignupLoginButton from '../signupLoginButton/SignupLoginButton'
import { useRecoilValue } from 'recoil'
import { checkUser } from '../../Store/atoms/userAtoms'
import { Box } from '@mui/material'

function Upload() {
    const userStatus=useRecoilValue(checkUser)

    return (
        <>
        {userStatus===true ? 
            (
                <>
                    <UploadPage/>
                </>
            ):(
                <Box sx={{margin:'40vh'}}>
                    <SignupLoginButton/>
                </Box>
            )
        }
        </>
    )
}

export default Upload
