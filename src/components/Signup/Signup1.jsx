// import {useState} from 'react'

// // import { CenterFocusStrong } from '@mui/icons-material';
// // import { theme } from '../../theme'
// // import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import {   Stack, TextField, styled,Box, Typography, Paper, Button, Grid, Card, CardMedia, InputLabel } from '@mui/material'
// import {  IconButton, InputBase } from '@mui/material';
// import { CloudUpload, Label, PhotoCamera } from '@mui/icons-material';
// // import './signup.css'

//   const CustomTextField = styled(TextField)(({ theme }) => ({
//     '& .MuiInputBase-root': {
//       height: '56px', // Set the height of the root input base
//     },
//     '& input': {
//       padding: '0 10px', // Adjust padding to ensure content fits
//       height: '100%', // Make input take full height of the root
//       boxSizing: 'border-box', // Ensure padding is included in the height calculation
//       border:'none'
//     },
//     width:"80%",
    
//   }));
  
  

// function Signup() {
//     const [Avatar,setAvatar] = useState('');
//     const [CoverImage, setCoverImage] = useState('');
  
//     const handleAvatarUpload = (event) => {
//         setAvatar(event.target.files[0]);
//     }
//     const handleCoverImageUpload = (event) => {
//         setCoverImage(event.target.files[0]);
//     }
//     const [image, setImage] = useState(null);
//     const [imageUrl, setImageUrl] = useState('');
//     return (
//         <Paper sx={{width:"60%", margin:"40px", marginLeft:"auto" , marginRight:"auto"}}>
//             <Stack spacing={2} margin='auto' width='60%' padding={4} >
//                 <CustomTextField  id="outlined-basic" label="Full Name" variant="standard"/>
//                 <CustomTextField  id="outlined-basic"  label="UserName" variant="standard"/>
//                 <CustomTextField   id="outlined-basic"  label="Email" variant="standard" type='email'/>
//                 <CustomTextField   id="outlined-basic"  label="Password" variant="standard" type='password'/>
                
                
//             </Stack>
//         </Paper>    
//     );
// }

// export default Signup
