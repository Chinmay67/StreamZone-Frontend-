import React, { useEffect } from 'react'
import { getUserSubscriptions } from '../../api/userService'

function UserSubscriptions() {
    useEffect(()=>{
        const fetchUserSubscriptions=async()=>{
            try {
                const response=await getUserSubscriptions()
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUserSubscriptions()
    })
  return (
    <div>
      user subscriptions
    </div>
  )
}

export default UserSubscriptions
