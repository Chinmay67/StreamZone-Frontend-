import React, { useEffect, useState } from 'react';
import { Button, IconButton, useMediaQuery, useTheme } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { checkUser } from '../../Store/atoms/userAtoms';
import { useRecoilValue } from 'recoil';
import { checkUserSubscription, toggleChannelSubscription } from '../../api/userService';
import { getSubscriberCount } from '../../api/free';

function SubscribeButton({ id }) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const userStatus = useRecoilValue(checkUser);
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        const fetchSubscription = async (channelId) => {
            try {
                const response = await checkUserSubscription(channelId);
                setIsSubscribed(response);
                console.log(response)
            } catch (error) {
                console.log(error);
            }
        };
        fetchSubscription(id);
    }, [id]);

    const handleToggleSubscriptions = async () => {
        try {
            const response = await toggleChannelSubscription(id);
            setIsSubscribed(prev => !prev);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
        const fetchChannelSubscriberCount=async(id)=>{
          try {
            const response=await getSubscriberCount(id);
            console.log(response)
            return response;
           
          } catch (error) {
            console.log(error)
          }
        }
        fetchChannelSubscriberCount(id)
      },[id])
    return (
        <>
            {isSmallScreen ? (
                <IconButton
                    onClick={handleToggleSubscriptions}
                    color={isSubscribed ? 'primary' : 'default'}
                    disabled={!userStatus}
                >
                    <NotificationsIcon />
                </IconButton>
            ) : (
                <Button
                    onClick={handleToggleSubscriptions}
                    variant="contained"
                    color="secondary"
                    disabled={!userStatus}
                >
                    {isSubscribed ? 'Subscribed' : 'Subscribe'}
                </Button>
            )}
        </>
    );
}

export default SubscribeButton;
