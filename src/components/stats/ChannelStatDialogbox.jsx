import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';

function ChannelStatDialogbox({ open, handleClose, userStats }) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
    <DialogTitle>Channel Statistics</DialogTitle>
    <DialogContent>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        <Typography variant="h6">
          Total Views: <strong>{userStats?.totalViews[0]?.totalViews}</strong>
        </Typography>
        <Typography variant="h6">
          Total Videos: <strong>{userStats?.NumberOfVideos}</strong>
        </Typography>
        <Typography variant="h6">
          Subscribers: <strong>{userStats?.subscriberCount}</strong>
        </Typography>
        
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary" variant="contained">
        Close
      </Button>
    </DialogActions>
  </Dialog>
  )
}

export default ChannelStatDialogbox
