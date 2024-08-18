import React from 'react'
import { useRecoilValue } from 'recoil'
import { checkUser, userAtom } from '../../Store/atoms/userAtoms'
// import StudioOptions from './StudioOptions'
import SignupLoginButton from '../signupLoginButton/SignupLoginButton'
import StudioDashboard from './StudioDashboard'

function Studio() {
    const userStatus=useRecoilValue(checkUser)
  return (
    userStatus === true ?(
        <StudioDashboard/>
    ):(
        <SignupLoginButton/>
    )
  )
}

export default Studio
