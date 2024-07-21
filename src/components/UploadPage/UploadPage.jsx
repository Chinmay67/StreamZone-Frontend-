import React, { useState } from 'react';
import { Container, Typography, TextField, FormControlLabel, Switch, Button, Box, IconButton, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { PhotoCamera, CloudUpload } from '@mui/icons-material';
import { styled } from '@mui/system';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      title,
      description,
      thumbnail,
      video,
      isPublished,
    });
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '50px', backgroundColor: '#f5f5f5', padding: '30px', borderRadius: '10px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}>
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
        <FormControlLabel
          control={
            <Switch
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              color="primary"
            />
          }
          label="Published"
          style={{ marginTop: '10px', marginBottom: '20px' }}
        />
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
    </Container>
  );
};

export default UploadPage;
