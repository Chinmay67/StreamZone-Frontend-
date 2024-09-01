// import React from 'react';
// import { Paper, Avatar, Typography, Box } from '@mui/material';

// const ChannelProfileCard = ({ channel }) => {
//   return (
//     <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', maxWidth: 400 }}>
//       {/* Avatar */}
//       <Avatar
//         src={channel.avatar}
//         alt={channel.username}
//         sx={{ width: 64, height: 64, mr: 2 }} // Size and margin right for spacing
//       />
//       {/* Channel Info */}
//       <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//         {/* Channel Name */}
//         <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
//           {channel.username}
//         </Typography>
//         {/* Full Name */}
//         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//           {channel.fullName}
//         </Typography>
//       </Box>
//     </Paper>
//   );
// };

// export default ChannelProfileCard
import React from 'react';
import { Paper, Avatar, Typography, Box } from '@mui/material';

const ChannelProfileCard = ({ channel }) => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: { xs: 2, md: 3 },  // Adjust padding for smaller and larger screens
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textAlign: 'center',
        maxWidth: '100%', 
        margin: '0 auto' 
      }}
    >
      {/* Avatar */}
      <Avatar
        src={channel.avatar}
        alt={channel.username}
        sx={{ 
          width: { xs: 60, md: 80 }, // Adjust size for different screens
          height: { xs: 60, md: 80 }, 
          mb: 2 
        }} 
      />
      {/* Channel Info */}
      <Box sx={{ width: '100%' }}>
        {/* Channel Name */}
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 1, 
            fontSize: { xs: '1rem', md: '1.25rem' }  // Adjust font size for different screens
          }}
        >
          {channel.username}
        </Typography>
        {/* Full Name */}
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'text.secondary', 
            fontSize: { xs: '0.875rem', md: '1rem' } // Adjust font size for different screens
          }}
        >
          {channel.fullname}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ChannelProfileCard;
