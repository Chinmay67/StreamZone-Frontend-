import React, { useState } from 'react';
import { Container, Typography, TextField, FormControlLabel, Switch, Button, Box, IconButton, Grid, Card, CardMedia, CardContent, LinearProgress, CircularProgress, Stack } from '@mui/material';
import { PhotoCamera, CloudUpload } from '@mui/icons-material';
import { styled } from '@mui/system';
import { uploadVideo } from '../../api/videoService';
import { useNavigate } from 'react-router-dom';

const Input = styled('input')({
  display: 'none',
});

const UploadPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(2);
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('thumbnail', thumbnail);
    formData.append('videoFile', video);
    // formData.append('isPublished', isPublished);
    console.log(formData);

    setIsUploading(1);
    setUploadProgress(0);

    try {
      const videoResponse = await uploadVideo(formData, (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);
      });
      console.log(videoResponse);
      setIsUploading(3);
      setUploadProgress(0);
      setTimeout(() => {
        navigate('/channel')
            }, 5000 );
    } catch (error) {
      console.log(error);
      setIsUploading(2);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '50px', backgroundColor: '#f5f5f5', padding: '30px', borderRadius: '10px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}>
      
        {isUploading===1   &&  
          <Box my={2}>
            <Typography variant="body2" color="textSecondary" component="p" align="center">
              Uploading: {uploadProgress}%
            </Typography>
            <LinearProgress variant="determinate" value={uploadProgress} />
            <Box display="flex" justifyContent="center" mt={2}>
              <CircularProgress />
            </Box>
          </Box>
        }
        {isUploading===2 && (
          <>
          <Typography variant="h3" component="h1" align="center" gutterBottom style={{ color: '#3f51b5', fontWeight: 'bold' }}>
        Upload Video
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {/* <FormControlLabel
          control={
            <Switch
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              color="primary"
            />
          }
          label="Published"
          style={{ marginTop: '10px', marginBottom: '20px' }}
        /> */}
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6}>
            <label htmlFor="thumbnail-upload">
              <Input accept="image/*" id="thumbnail-upload" type="file" onChange={handleThumbnailChange} />
              <IconButton color="primary" aria-label="upload thumbnail" component="span">
                <PhotoCamera style={{ fontSize: '40px' }} />
              </IconButton>
              <Typography variant="body2">{thumbnail ? thumbnail.name : 'Upload Thumbnail'}</Typography>
            </label>
            {thumbnailPreview && (
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={thumbnailPreview}
                  alt="Thumbnail Preview"
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Thumbnail Preview
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <label htmlFor="video-upload">
              <Input accept="video/*" id="video-upload" type="file" onChange={handleVideoChange} />
              <IconButton color="primary" aria-label="upload video" component="span">
                <CloudUpload style={{ fontSize: '40px' }} />
              </IconButton>
              <Typography variant="body2">{video ? video.name : 'Upload Video'}</Typography>
            </label>
            {videoPreview && (
              <Card>
                <CardMedia
                  component="video"
                  controls
                  height="140"
                  image={videoPreview}
                  alt="Video Preview"
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Video Preview
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<CloudUpload />}
          style={{ marginTop: '30px', padding: '10px', fontSize: '18px' }}
        >
          Upload
        </Button>
      </form>
          </>
        )}
      {isUploading===3 && <Stack>
        <Typography>Video Uploaded Successfully</Typography>
        <Button
        onClick={()=>navigate('/channel')}>Channel Profile</Button>
        </Stack>}  
        
    </Container>
    
  );
};

export default UploadPage;
