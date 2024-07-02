import  { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Stack, TextField, styled, Box, Typography, Paper, Button, GlobalStyles, CircularProgress, Snackbar, Alert as MuiAlert } from '@mui/material';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../Store/atoms/userAtoms';
import { loginUser } from '../../api/userService';

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

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useRecoilState(userAtom);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const loggedUser = await loginUser(email, password);
      const loggedUserData = loggedUser.data.user;
      setCurrentUser(loggedUserData);

      setSuccessMessage('Logged in successfully');
      setLoading(false);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

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
              <Typography variant="h4" align="center" color="primary">Login Form</Typography>
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
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 4, borderRadius: '20px' }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
              </Button>
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

export default Login;
