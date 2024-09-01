// // import React, { useEffect, useState } from 'react'
// // import { getUserSubscriptions } from '../../api/userService'
// // import { Box, Grid, Stack } from '@mui/material'
// // import ChannelProfileCard from './ChannelProfileCard'

// // function UserSubscriptions() {
// //     const [subscriptions, setSubscriptions] = useState([])
// //     useEffect(()=>{
// //         const fetchUserSubscriptions=async()=>{
// //             try {
// //                 const response=await getUserSubscriptions()
// //                 console.log(response)
// //                 setSubscriptions(response)
// //             } catch (error) {
// //                 console.log(error)
// //             }
// //         }
// //         fetchUserSubscriptions()
// //     },[])
// //   return (
// //     <Grid container spacing={2} sx={{width:"80%"}}>
// //         {subscriptions.map((subscription, index) => (
// //             <Grid item xs={12} key={index}>
// //                 <ChannelProfileCard channel={subscription.channel}/>
// //             </Grid>
// //             ))}
// //     </Grid>
// //   )
// // }

// // export default UserSubscriptions
// import React, { useEffect, useState } from 'react';
// import { getUserSubscriptions } from '../../api/userService';
// import { Grid } from '@mui/material';
// import ChannelProfileCard from './ChannelProfileCard';
// import { useNavigate } from 'react-router-dom';

// function UserSubscriptions() {
//     const navigate=useNavigate()
//   const [subscriptions, setSubscriptions] = useState([]);

//   useEffect(() => {
//     const fetchUserSubscriptions = async () => {
//       try {
//         const response = await getUserSubscriptions();
//         console.log(response);
//         setSubscriptions(response);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchUserSubscriptions();
//   }, []);

//   return (
//     <Grid container spacing={3} sx={{ width: "100%", margin: "0 auto" }}>
//       {subscriptions.map((subscription, index) => (
//         <Grid item xs={12} sm={6} md={4} lg={3} key={index} onClick={()=>navigate(`/OtherChannel/${subscription.channel.username}`)}>
//           <ChannelProfileCard channel={subscription.channel} />
//         </Grid>
//       ))}
//     </Grid>
//   );
// }

// export default UserSubscriptions;
import React, { useEffect, useState } from 'react';
import { getUserSubscriptions } from '../../api/userService';
import { Grid } from '@mui/material';
import ChannelProfileCard from './ChannelProfileCard';
import { useNavigate } from 'react-router-dom';

function UserSubscriptions() {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchUserSubscriptions = async () => {
      try {
        const response = await getUserSubscriptions();
        console.log(response);
        setSubscriptions(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserSubscriptions();
  }, []);

  return (
    <Grid 
      container 
      spacing={3} 
      sx={{ 
        width: "100%", 
        maxWidth: "1200px", 
        margin: "0 auto", 
        padding: { xs: 2, sm: 3, md: 4 }
      }}
    >
      {subscriptions.map((subscription, index) => (
        <Grid 
          item 
          xs={12} 
          sm={6} 
          md={4} 
          lg={3} 
          key={index} 
          onClick={() => navigate(`/OtherChannel/${subscription.channel.username}`)}
        >
          <ChannelProfileCard channel={subscription.channel} />
        </Grid>
      ))}
    </Grid>
  );
}

export default UserSubscriptions;

