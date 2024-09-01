
// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemButton from '@mui/material/ListItemButton';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import CloseIcon from '@mui/icons-material/Close';
// import Slide from '@mui/material/Slide';

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
//   });
// function EditVideoDialogBox(open) {
//     const [newOpen, setNewOpen] = React.useState(open);

    

//     const handleClose = () => {
//         setNewOpen(false);
//     };
//   return (
//     <React.Fragment>
   
//     <Dialog
//       fullScreen
//       open={newOpen}
//       onClose={handleClose}
//       TransitionComponent={Transition}
//     >
//       <AppBar sx={{ position: 'relative' }}>
//         <Toolbar>
//           <IconButton
//             edge="start"
//             color="inherit"
//             onClick={handleClose}
//             aria-label="close"
//           >
//             <CloseIcon />
//           </IconButton>
//           <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
//             Sound
//           </Typography>
//           <Button autoFocus color="inherit" onClick={handleClose}>
//             save
//           </Button>
//         </Toolbar>
//       </AppBar>
//       <List>
//         <ListItemButton>
//           <ListItemText primary="Phone ringtone" secondary="Titania" />
//         </ListItemButton>
//         <Divider />
//         <ListItemButton>
//           <ListItemText
//             primary="Default notification ringtone"
//             secondary="Tethys"
//           />
//         </ListItemButton>
//       </List>
//     </Dialog>
//   </React.Fragment>
//   )
// }

// export default EditVideoDialogBox
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  CircularProgress,
  Switch,
  FormControlLabel,
  Typography,
  Grid,
  CardMedia
} from '@mui/material';
import { editVideoDetails, EditVideoThumbnail } from '../../../api/studioService';

function EditVideoDialogBox({ open, handleClose, video }) {
  // State variables
  const [tabIndex, setTabIndex] = useState(0);
  const [videoTitle, setTitle] = useState(video.title);
  const [videoDescription, setDescription] = useState(video.description);
  const [published, setPublished] = useState(video.isPublished);
  const [currentThumbnail, setCurrentThumbnail] = useState(video.thumbnail || '');
  const [newThumbnail, setNewThumbnail] = useState(null);
  const [newThumbnailPreview, setNewThumbnailPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Reset state when the dialog opens
  useEffect(() => {
    if (open) {
      setTitle(video.title);
      setDescription(video.description);
      setPublished(video.isPublished);
      setCurrentThumbnail(video.thumbnail || '');
      setNewThumbnail(null);
      setNewThumbnailPreview(null);
    }
  }, [open, video]);

  // Handle tab changes
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // Handle thumbnail selection
  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewThumbnail(file);
      setNewThumbnailPreview(URL.createObjectURL(file));
    }
  };

  // Handle saving changes
  // const handleSaveChanges = async () => {
  //   setIsLoading(true);
  //   try {
  //     // Simulate a backend API call with a timeout
  //     // await new Promise((resolve) => setTimeout(resolve, 2000));

  //     // Here, you would typically send the updated data to the backend
  //     // For example:
  //     // await api.updateVideo({
  //     //   title: videoTitle,
  //     //   description: videoDescription,
  //     //   isPublished: published,
  //     //   thumbnail: newThumbnail,
  //     // });
  //     if(tabIndex!==0){
        
  //     else if(tabIndex!==1){
  //       
  //     }

  //     // After successful backend update, update the current thumbnail if a new one was selected
  //     if (newThumbnailPreview) {
  //       setCurrentThumbnail(newThumbnailPreview);
  //       setNewThumbnail(null);
  //       setNewThumbnailPreview(null);
  //     }

  //     setIsLoading(false);
  //     handleClose();
  //   } catch (error) {
  //     console.error('Error saving changes:', error);
  //     setIsLoading(false);
  //     // Optionally, handle error feedback to the user here
  //   }
  // };
  const handleUpdateVideoDetails=async()=>{
    const details={
      title:videoTitle,
      description:videoDescription,
      isPublished:published,
    }
    try {
      const response=await editVideoDetails(video._id,details)
      console.log(response)
      window.location.reload()


    } catch (error) {
      console.log(error)
    }
  }
  const handleUpdateVideoThumbnail=async()=>{
        const formData=new FormData()
        formData.append('thumbnail',newThumbnail)
        try {
          const response=await EditVideoThumbnail(video._id,formData)
          console.log(response)
          window.location.reload()
          setNewThumbnailPreview(null);
        } catch (error) {
          console.log(error)
        }
  }
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Video</DialogTitle>
      <DialogContent>
        {/* Tabs for Details and Thumbnail */}
        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Edit Video Tabs">
          <Tab label="Details" />
          <Tab label="Thumbnail" />
        </Tabs>

        {/* Details Tab Content */}
        <Box hidden={tabIndex !== 0} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Title"
            value={videoTitle}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            value={videoDescription}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                color="primary"
              />
            }
            label="Published"
            sx={{ mb: 2 }}
          />
          <Box>
          <Button
          
          variant="contained"
          color="primary"
          onClick={handleUpdateVideoDetails}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Save Changes'}
        </Button>
          </Box>
        </Box>

        {/* Thumbnail Tab Content */}
        <Box hidden={tabIndex !== 1} sx={{ mt: 2 }}>
          <Grid container spacing={2} alignItems="center">
            {/* Current Thumbnail Preview */}
            {currentThumbnail && (
              <Grid item xs={6}>
                <Typography variant="subtitle1">Current Thumbnail</Typography>
                <CardMedia
                  component="img"
                  src={currentThumbnail}
                  alt="Current Thumbnail"
                  sx={{ width: '100%', height: 'auto', maxHeight: '150px', borderRadius: 1 }}
                />
              </Grid>
            )}

            {/* New Thumbnail Preview */}
            {newThumbnailPreview && (
              <Grid item xs={6}>
                <Typography variant="subtitle1">New Thumbnail Preview</Typography>
                <CardMedia
                  component="img"
                  src={newThumbnailPreview}
                  alt="New Thumbnail Preview"
                  sx={{ width: '100%', height: 'auto', maxHeight: '150px', borderRadius: 1 }}
                />
              </Grid>
            )}
           
          </Grid>

          {/* Upload Button */}
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" component="label">
              Upload New Thumbnail
              <input type="file" hidden accept="image/*" onChange={handleThumbnailChange} />
            </Button>
            <Button
              sx={{margin:'2vh'}}
              variant="contained"
              color="primary"
              onClick={handleUpdateVideoThumbnail}
              disabled={isLoading}
            >
          {isLoading ? <CircularProgress size={24} /> : 'Save Changes'}
        </Button>
          </Box>
        </Box>
      </DialogContent>

      {/* Save Changes Button at the Bottom */}
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} disabled={isLoading}>
          Cancel
        </Button>
        
      </DialogActions>
    </Dialog>
  );
}

export default EditVideoDialogBox;
