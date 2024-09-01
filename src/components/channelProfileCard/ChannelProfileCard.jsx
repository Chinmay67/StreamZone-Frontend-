import React from 'react';
import { Paper, Avatar, Typography, Box } from '@mui/material';

const ChannelProfileCard = ({ avatarUrl, channelName, fullName }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', maxWidth: 400 }}>
      {/* Avatar */}
      <Avatar
        src={avatarUrl}
        alt={channelName}
        sx={{ width: 64, height: 64, mr: 2 }} // Size and margin right for spacing
      />
      {/* Channel Info */}
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Channel Name */}
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {channelName}
        </Typography>
        {/* Full Name */}
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {fullName}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ChannelProfileCard