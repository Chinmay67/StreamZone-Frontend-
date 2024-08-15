import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { checkUser } from '../../Store/atoms/userAtoms'
import { useRecoilValue } from 'recoil'
import { checkUserSubscription, toggleChannelSubscription } from '../../api/userService'

function SubscribeButton(id) {

   
   
    console.log(id)
    const channel=id;
    const userStatus=useRecoilValue(checkUser)
    const [isSubscribed, setIsSubscribed] = useState(false)
    useEffect(()=>{
      const fetchSubscription=async(channelId)=>{
        try {
          const response=await checkUserSubscription(channelId.id)
          setIsSubscribed(response)
          console.log(response)
        } catch (error) {
          console.log(error)
        }
      }
      fetchSubscription(id)

    },[id])
    const handleToggleSubscriptions=async()=>{
      console.log(channel.id)
      try {
        const response=await toggleChannelSubscription(channel.id)
        console.log(response)
        setIsSubscribed((prev)=>!prev)
        return response
      } catch (error) {
        console.log(error)
      } 
    }
  return (
   
      <Button onClick={handleToggleSubscriptions} variant="contained" color="secondary" disabled={userStatus===false ? true:false}>
       {!isSubscribed && <>Subscribe </>}
       {isSubscribed &&<>Subscribed</> }
      </Button>
   
  )
}

export default SubscribeButton
