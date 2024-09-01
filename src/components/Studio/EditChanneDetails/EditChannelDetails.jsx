import React, { useState } from 'react';
import { Tabs, Tab, TextField, Button, Avatar, Box, Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../../Store/atoms/userAtoms';
import { editChannelDetails, editUserAvatar, editUserCoverImage } from '../../../api/studioService';

function EditChannelDetails() {
    const [selectedTab, setSelectedTab] = useState(0);
    const [currentUser,setCurrentUser]=useRecoilState(userAtom)
    const [secondTab,setSecondTab]=useState(0)
    const [newCoverImage,setNewCoverImage]=useState(null)
    const [newAvatar,setNewAvatar]=useState(null)
    const [fullname,setFullname]=useState(currentUser.fullname)
    const [email, setEmail]=useState(currentUser.email)

    const [avatarPreview, setAvatarPreview] = useState(null);
    const [coverImagePreview, setCoverImagePreview] = useState(null);
  
    const handleTabChange = (event, newValue) => {
      setSelectedTab(newValue);
    };
    const handleSecondTabChange = (event, newValue) => {
      setSecondTab(newValue);
    };
  
    // const handleProfileChange = (e) => {
    //   setProfileDetails({
    //     ...profileDetails,
    //     [e.target.name]: e.target.value,
    //   });
    // };
  
    const handleAvatarChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setNewAvatar(file)
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleCoverImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setNewCoverImage(file)
        const reader = new FileReader();
        reader.onloadend = () => {
          setCoverImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
    const handleCoverImageUpdate=async()=>{
      const formData=new FormData()
      formData.append('coverImage',newCoverImage)
      try {
        const response=await editUserCoverImage(formData);
        console.log(response)
      } catch (error) {
        console.log(error)

      }

    }
    const handleAvatarUpdate=async()=>{
      const formData=new FormData();
      formData.append('avatar',newAvatar);
      try {
        const response=await editUserAvatar(formData)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    const handleUserDetailsUpdate=async()=>{
      const details={
        fullname,
        email
      }
      try {
        const response=await editChannelDetails(details)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    return (
    <Box>
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="Edit Profile & Channel Details" />
        <Tab label="Update Images" />
      </Tabs>
      {selectedTab === 0 && (
        <Box sx={{ padding: 3 }}>
          <Typography variant="h6">Profile Details</Typography>
         
          <TextField
            label="User Name"
            name="userName"
            value={fullname}
            onChange={(e)=>setFullname(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
           <Button onClick={handleUserDetailsUpdate} variant="contained" color="primary"  sx={{ marginTop: 3 }}>
              Save Changes
          </Button>
        </Box>
      )}
      {selectedTab === 1 && (
        <Box sx={{ padding: 3 }}>
          <Tabs value={secondTab} onChange={handleSecondTabChange}>
            <Tab label="Update Avatar" />
            <Tab label="Update Cover Image" />
          </Tabs>
          {secondTab === 0 && (
            <Box sx={{ padding: 3 }}>
              <Typography variant="h6">Update Avatar</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={currentUser.avatar} sx={{ width: 100, height: 100, marginRight: 2 }} />
                {avatarPreview && (
                  <Avatar src={avatarPreview} sx={{ width: 100, height: 100, marginLeft: 2 }} />
                )}
              </Box>
              <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
                Choose Avatar
                <input type="file" hidden onChange={handleAvatarChange} />
              </Button>
              <Box>
              <Button onClick={handleAvatarUpdate} variant="contained" color="primary"  sx={{ marginTop: 3 }}>
                Save Changes
              </Button>
              </Box>
            </Box>
          )}
          {secondTab === 1 && (
            <Box sx={{ padding: 3 }}>
              <Typography variant="h6">Update Cover Image</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={currentUser.coverImage}
                  alt="Current Cover"
                  style={{ width: '20%', marginRight: '16px' }}
                />
                {coverImagePreview && (
                  <img
                    src={coverImagePreview}
                    alt="New Cover Preview"
                    style={{ width: '50%', marginLeft: '16px' }}
                  />
                )}
                 
              </Box>
              <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
                Choose Cover Image
                <input type="file" hidden onChange={handleCoverImageChange} />
              </Button>
              <Box>
              <Button onClick={handleCoverImageUpdate} variant="contained" color="primary"  sx={{ marginTop: 3 }}>
                Save Changes
              </Button>
              </Box>
            </Box>
          )}
          
        </Box>
      )}
     
    </Box>
  )
}

export default EditChannelDetails
