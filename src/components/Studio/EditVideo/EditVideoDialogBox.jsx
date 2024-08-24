
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
import React, { useEffect } from 'react';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function EditVideoDialogBox({ open, video, handleClose }) {
  const [value, setValue] = React.useState(0);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [thumbnail, setThumbnail] = React.useState(null);

  useEffect(() => {
    if (video) {
      setTitle(video.title);
      setDescription(video.description);
      // Assuming there's a thumbnail field in the video object
      setThumbnail(video.thumbnail || null);
    }
  }, [video]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTitleDescriptionChange = () => {
    // Implement logic to update title and description
    console.log('Updated Title:', title);
    console.log('Updated Description:', description);
  };

  const handleThumbnailChange = () => {
    // Implement logic to update thumbnail
    console.log('Updated Thumbnail:', thumbnail);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Edit Video
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleTabChange} centered>
          <Tab label="Title & Description" />
          <Tab label="Thumbnail" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Typography variant="h6">Change Title and Description</Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleTitleDescriptionChange}
            sx={{ mt: 2 }}
          >
            Apply Changes
          </Button>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography variant="h6">Change Thumbnail</Typography>
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2, mb: 2 }}
          >
            Upload Thumbnail
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleThumbnailChange}
            sx={{ mt: 2 }}
          >
            Apply Changes
          </Button>
        </TabPanel>
      </Box>
    </Dialog>
  );
}

export default EditVideoDialogBox;
