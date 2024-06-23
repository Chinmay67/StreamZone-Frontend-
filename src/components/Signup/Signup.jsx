import { useState,useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Stack, TextField, styled, Box, Typography, Paper, Button, Card, CardMedia, InputLabel, GlobalStyles } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import UserContext from '../../Context/UserContext';
// Custom theme with darker colors and updated text label color
const theme = createTheme({
  palette: {
    primary: {
      main: '#37474F', // Dark gray
    },
    secondary: {
      main: '#00838F', // Dark teal
    },
    text: {
      primary: '#FFFFFF', // White for text labels
    },
  },
});

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    height: '56px', // Set the height of the root input base
  },
  '& input': {
    padding: '0 10px', // Adjust padding to ensure content fits
    height: '100%', // Make input take full height of the root
    boxSizing: 'border-box', // Ensure padding is included in the height calculation
    border: 'none',
    color: theme.palette.text.primary, // Set input text color
  },
  width: "80%",
}));

const CustomInputLabel = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.text.primary, // Set label text color
}));

const ImageUpload = ({ label, image, onChange }) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
      <CustomInputLabel sx={{ mr: 2, minWidth: 100 }}>{label}</CustomInputLabel>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id={`upload-${label}`}
        type="file"
        onChange={onChange}
      />
      <label htmlFor={`upload-${label}`}>
        <Button variant="contained" component="span" color="secondary" startIcon={<PhotoCamera />}>
          Upload
        </Button>
      </label>
      {image && (
        isSmallScreen ? (
          <Typography sx={{ ml: 2, color: theme.palette.text.primary }}>{image.name}</Typography>
        ) : (
          <Card sx={{ maxWidth: 100, ml: 2 }}>
            <CardMedia component="img" height="100" image={URL.createObjectURL(image)} alt={`${label} Preview`} />
          </Card>
        )
      )}
    </Box>
  );
};

function Signup() {
  const [avatar, setAvatar] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [UserName,setUserName]=useState('')
  const [Email,setEmail]=useState('')
  const [Password,setPassword]=useState('')
  const [FullName,setFullName]=useState('')

  const {user,setUser} = useContext(UserContext)
  const handleAvatarUpload = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleCoverImageUpload = (event) => {
    setCoverImage(event.target.files[0]);
  };
  const handleSubmit=(e)=>{
    e.preventDefault()
    setUser({
        UserName,
        Email,
        Password,
        FullName,
        avatar,
        coverImage


    })
    console.log(user)
    
    
  }
  

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { overflow: 'hidden' } }} />
      <Box sx={{
        background: 'linear-gradient(to bottom, #455A64, #263238)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2
      }}>
        <Paper sx={{
          width: "60%",
          padding: 4,
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Enhanced shadow
          borderRadius: 3,
          background: '#37474F' // Darker form background
        }}>
          <Stack spacing={2} margin='auto' width='80%'>
            <Typography variant="h4" align="center" color="secondary">Signup Form</Typography>
            <CustomTextField 
            
            label="Full Name" 
            variant="standard"
            value={FullName}
            onChange={(e)=>setFullName(e.target.value)}/>
            <CustomTextField 
            id="username" label="Username" 
            variant="standard"
            
            value={UserName}
            onChange={(e)=>setUserName(e.target.value)}
            />
            <CustomTextField id="email" 
            label="Email" 
            variant="standard" 
            type='email'
            value={Email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <CustomTextField id="password" 
            label="Password" 
            variant="standard" 
            type='password' 
            value={Password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <ImageUpload label="Avatar" image={avatar} onChange={handleAvatarUpload} />
            <ImageUpload label="Cover Image" image={coverImage} onChange={handleCoverImageUpload} />
            <Button
             
            variant="contained" 
            color="secondary" 
            sx={{ mt: 4 }}
            onClick={handleSubmit}
            >Submit</Button>
          </Stack>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default Signup;
