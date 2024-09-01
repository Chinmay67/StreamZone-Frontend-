// import React, { useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';

// function ChannelStatDialogbox({ open, handleClose, userStats }) {
//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//     <DialogTitle>Channel Statistics</DialogTitle>
//     <DialogContent>
//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
//         <Typography variant="h6">
//           Total Views: <strong>{userStats?.totalViews[0]?.totalViews}</strong>
//         </Typography>
//         <Typography variant="h6">
//           Total Videos: <strong>{userStats?.NumberOfVideos}</strong>
//         </Typography>
//         <Typography variant="h6">
//           Subscribers: <strong>{userStats?.subscriberCount}</strong>
//         </Typography>
        
//       </Box>
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={handleClose} color="primary" variant="contained">
//         Close
//       </Button>
//     </DialogActions>
//   </Dialog>
//   )
// }

// export default ChannelStatDialogbox
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';

function ChannelStatDialogbox({ open, handleClose, userStats }) {
  // Fallback values in case userStats is undefined or doesn't have the necessary properties
  const totalViews = userStats?.totalViews?.[0]?.totalViews || 'N/A';
  const totalVideos = userStats?.NumberOfVideos || 'N/A';
  const subscriberCount = userStats?.subscriberCount || 'N/A';

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Channel Statistics</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <Typography variant="h6">
            Total Views: <strong>{totalViews}</strong>
          </Typography>
          <Typography variant="h6">
            Total Videos: <strong>{totalVideos}</strong>
          </Typography>
          <Typography variant="h6">
            Subscribers: <strong>{subscriberCount}</strong>
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ChannelStatDialogbox;
