import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Stack, TextField, styled, Box, Typography, Paper, Button, Card, CardMedia, InputLabel, GlobalStyles, CircularProgress, Snackbar, Alert as MuiAlert } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userAtom, checkUser as checkUserAtom } from '../../Store/atoms/userAtoms';
import { RegisterUser, loginUser } from '../../api/userService';
import { Link, useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a73e8', // Blue
    },
    secondary: {
      main: '#34a853', // Green
    },
    text: {
      primary: '#202124', // Dark gray for text labels
    },
  },
});

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    height: '56px',
  },
  '& input': {
    padding: '0 10px',
    height: '100%',
    boxSizing: 'border-box',
    border: 'none',
    color: theme.palette.text.primary,
  },
  width: "100%",
}));

const CustomInputLabel = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
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
  const [newUser, SetNewUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullName] = useState('');
  const [currentUser, setCurrentUser] = useRecoilState(userAtom);
  const setCheckUser = useSetRecoilState(checkUserAtom); // Use the correct atom

  const navigate=useNavigate();
  const handleAvatarUpload = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleCoverImageUpload = (event) => {
    setCoverImage(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const formData = new FormData();
    formData.append('username', username);
    formData.append('fullname', fullname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', avatar);
    formData.append('coverImage', coverImage);

    try {
      const userDetails = await RegisterUser(formData);
      const userData = userDetails.data;
      
      console.log(userDetails)
      if(userDetails.status===200){
        const loggedUser = await loginUser(email, password);
        const loggedUserData = loggedUser.data.user;
        SetNewUser(userData);
        setCurrentUser(loggedUserData);
        // localStorage.setItem('userID', loggedUserData._id);
        setCheckUser(true); // Use boolean true instead of string "true"
        setSuccessMessage('Registration done and logged in successfully');
        setAvatar(null);
        setCoverImage(null);
        setUserName('');
        setEmail('');
        setPassword('');
        setFullName('');
        navigate('/channel')
      }
      else if(userDetails.status===400){
        setErrorMessage( 'All fields are required except coverImage');
      }
      else if(userDetails.status===409){
        setErrorMessage('Email or username already exists');
      }

    } catch (error) {
      console.log(error);
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={{ body: { overflow: 'hidden' } }} />
        <Box sx={{
          background: 'linear-gradient(to bottom, #e8f0fe, #ffffff)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Paper sx={{
            width: "40%",
            padding: 4,
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
            borderRadius: 3,
            background: '#ffffff'
          }}>
            <Stack spacing={2} margin='auto' width='100%'>
              <Typography variant="h4" align="center" color="primary">Signup Form</Typography>
              <CustomTextField
                label="Full Name"
                variant="standard"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
              />
              <CustomTextField
                id="username"
                label="Username"
                variant="standard"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <CustomTextField
                id="email"
                label="Email"
                variant="standard"
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <CustomTextField
                id="password"
                label="Password"
                variant="standard"
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <ImageUpload label="Avatar" image={avatar} onChange={handleAvatarUpload} />
              <ImageUpload label="Cover Image" image={coverImage} onChange={handleCoverImageUpload} />
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 4, borderRadius: '20px' }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
              </Button>
              <Typography>Have an account <Button component={Link} to='/login'>Login</Button></Typography>
            </Stack>
            
          </Paper>
        </Box>
      </ThemeProvider>

      <Snackbar
        open={!!successMessage}
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert elevation={6} variant="filled" onClose={() => setSuccessMessage('')} severity="success">
          {successMessage}
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={!!errorMessage}
        onClose={() => setErrorMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert elevation={6} variant="filled" onClose={() => setErrorMessage('')} severity="error">
          {errorMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default Signup;
