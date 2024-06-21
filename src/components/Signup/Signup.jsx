import {useState,useEffect} from 'react'

import { CenterFocusStrong } from '@mui/icons-material';
import { theme } from '../../theme'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FormControl, FormGroup,  Stack, TextField, styled,Box, Typography } from '@mui/material'
import { Button, IconButton, InputBase } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
// import './signup.css'

  const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
      height: '56px', // Set the height of the root input base
    },
    '& input': {
      padding: '0 10px', // Adjust padding to ensure content fits
      height: '100%', // Make input take full height of the root
      boxSizing: 'border-box', // Ensure padding is included in the height calculation
      border:'none'
    },
    width:"80%",
    
  }));
  
  

function Signup() {
    const [Avatar,setAvatar] = useState('');
    const [CoverImage, setCoverImage] = useState('');
  
    const handleAvatarUpload = (event) => {
        setAvatar(event.target.files[0]);
    }
    const handleCoverImageUpload = (event) => {
        setCoverImage(event.target.files[0]);
    }
    return (
        <Stack spacing={2} margin='auto' width='60%' padding={4} >
            <CustomTextField  id="outlined-basic" label="Full Name" variant="standard"/>
            <CustomTextField  id="outlined-basic"  label="UserName" variant="standard"/>
            <CustomTextField   id="outlined-basic"  label="Email" variant="standard" type='email'/>
            <CustomTextField   id="outlined-basic"  label="Password" variant="standard" type='password'/>
            <Box>
            
                <InputBase
                    type="file"
                    id="file"
                    name="file"
                    value={undefined}
                    multiple accept="image/*"
                    onChange={handleAvatarUpload}
                    inputProps={{ ariaLabel: 'Upload file' }}
                    />
                    <IconButton component="span" aria-label="Upload file">
                        <CloudUpload />
                        <Typography display='inline' margin={2}>Upload Avatar</Typography>
                    </IconButton>
                    {Avatar && (
                        <span style={{ marginLeft: 10 }}>{Avatar.name}</span>
                    )}
                    
                
            </Box>
            <Box>
            
                <InputBase
                    type="file"
                    id="file"
                    name="file"
                    multiple accept="image/*"
                    value={undefined}
                    onChange={handleCoverImageUpload}
                    inputProps={{ ariaLabel: 'Upload file' }}
                    />
                    <IconButton component="span" aria-label="Upload file">
                        <CloudUpload />
                        <Typography display='inline' margin={2}>Upload Avatar</Typography>
                    </IconButton>
                    {CoverImage && (
                        <span style={{ marginLeft: 10 }}>{CoverImage.name}</span>
                    )}
                    
                
            </Box>
        </Stack>
        
                
                
                
            
     
        
            // <div className="background">
            //     <div className="container1">
            //         <h1>Register</h1>
            //         <form>
            //             <div className="htmlform-group">
            //                 <label className="label1" htmlFor="name">Name:</label>
            //                 <input type="text" id="name" name="name" required className="form-input"/>
            //             </div>
            //             <div className="htmlform-group">
            //                 <label className="label1" htmlFor="email">Email:</label>
            //                 <input type="email" id="email" name="email" required className="form-input"/>
            //             </div>
            //             <div className="htmlform-group">
            //                 <label className="label1" htmlFor="password">Password:</label>
            //                 <input type="password" id="password" name="password" required className="form-input"/>
            //             </div>
            //             <div className="htmlform-group">
            //                 <label className="label1" htmlFor="phone">Phone:</label>
            //                 <input type="tel" id="phone" name="phone" required className="form-input"/>
            //             </div>
            //             <div className="htmlform-group">
            //                 <label className="label1" htmlFor="dob">Date of Birth:</label>
            //                 <input type="date" id="dob" name="dob" required className="form-input"/>
            //             </div>
            //             <div className="htmlform-group">
            //                 <label className="label1" htmlFor="address">Address:</label>
            //                 <input type="text" id="address" name="address" required className="form-input"/>
            //             </div>
            //             <div className="htmlform-group">
            //                 <label className="label1" htmlFor="resume">Upload Resume:</label>
            //                 <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" required className="form-input"/>
            //             </div>
            //             <div className="htmlform-group">
            //                 <label className="label1" htmlFor="photo">Upload Photo:</label>
            //                 <input type="file" id="photo" name="photo" accept="image/*" required className="form-input"/>
            //             </div>
            //             <button type="submit">Register</button>
            //         </form>
            //         <div className="signup-link">
            //             Already have an account? <a href="/login">Sign in</a>
            //         </div>
            //     </div>
            // </div>
        
    );
}

export default Signup
