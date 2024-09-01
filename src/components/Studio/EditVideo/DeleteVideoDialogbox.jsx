// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// function DeleteVideoDialogbox({open,handleClose,video}) {
//     const [newOpen, setOpen] = React.useState(open);

// //   const handleClickOpen = () => {
// //     setOpen(true);
// //   };

// //   const handleClose = () => {
// //     setOpen(false);
// //   };
//   return (
//     <React.Fragment>
      
//       <Dialog
//         open={newOpen}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">
//           {"Are u sure u want to delete the video?"}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//            This action will delete this video permanently from our Database.Are you sure?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>cancel</Button>
//           <Button onClick={handleClose} autoFocus>
//             Yes
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   )
// }

// export default DeleteVideoDialogbox
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DeleteVideo } from '../../../api/studioService';

function DeleteVideoDialogbox({ open, handleClose, video }) {
  
    const handleVideoDelete=async()=>{
        try {
            const response=await DeleteVideo(video._id)
            console.log(response)
            handleClose()
            window.location.reload()
        } catch (error) {
          console.log(error)
        }
    }
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this video?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action will delete this video permanently from our database. Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleVideoDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default DeleteVideoDialogbox;

