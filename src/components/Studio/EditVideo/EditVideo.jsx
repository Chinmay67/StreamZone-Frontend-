// import React, { useEffect, useState } from 'react'
// import { useRecoilValue } from 'recoil'
// import { checkUser } from '../../../Store/atoms/userAtoms'
// import SignupLoginButton from '../../signupLoginButton/SignupLoginButton'
// import { getUserVideos } from '../../../api/videoService'
// import { Box, Button, Stack } from '@mui/material'
// import HorizontalVideoCard from '../../VideoCard/HorizontalVideoCard'
// // import { WidthFull } from '@mui/icons-material'

// function EditVideo() {
//     const userStatus=useRecoilValue(checkUser)
//     const [videos,setVideos]=useState([])
//     useEffect(()=>{
//         const fetchUserVideos=async()=>{
//             if(userStatus){
//                 try {
//                     const response=await getUserVideos();
//                     console.log(response)
//                     setVideos(response.data)

//                 } catch (error) {
//                     console.log(error)
//                 }
//             }
//         }
//         fetchUserVideos();

//     },[userStatus])
//   return (
//     <>
//     {userStatus==true ?(
//         <Box>
//         <Box sx={{width:'50%'}}>
//           {videos.map((suggestion, index) => (
            
//             <HorizontalVideoCard
//               key={index}
//               suggestion={suggestion}
              
//             />
            
           
//           ))}
//         </Box>
//         <Button>Edit</Button>
        
//         </Box>
//     ):(<SignupLoginButton/>)}
//     </>
//   )
// }

// export default EditVideo
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { checkUser } from '../../../Store/atoms/userAtoms';
import SignupLoginButton from '../../signupLoginButton/SignupLoginButton';
import { getUserVideos } from '../../../api/videoService';
import { Box, Button, Stack } from '@mui/material';
import HorizontalVideoCard from '../../VideoCard/HorizontalVideoCard';
import EditVideoDialogBox from './EditVideoDialogBox';

function EditVideo() {
  const userStatus = useRecoilValue(checkUser);
  const [videos, setVideos] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({ title: '', description: '' });

  useEffect(() => {
    const fetchUserVideos = async () => {
      if (userStatus) {
        try {
          const response = await getUserVideos();
          console.log(response);
          setVideos(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchUserVideos();
  }, [userStatus]);

  const handleEditClick = (video) => {
    setSelectedVideo(video);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {userStatus ? (
        <Box sx={{ width: '50%' }}>
          {videos.map((video, index) => (
            <Stack 
              key={index} 
              direction="row" 
              alignItems="center" 
              justifyContent="space-between"
              spacing={2} 
              mb={2} 
            >
              <Box sx={{ flexGrow: 1 }}>
                <HorizontalVideoCard suggestion={video} />
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEditClick(video)}
              >
                Edit
              </Button>
            </Stack>
          ))}
        </Box>
      ) : (
        <SignupLoginButton />
      )}

      {/* Dialog Box
      <EditVideoDialogBox
        open={open}
        handleClose={handleClose}
        video={selectedVideo}
      /> */}
    </>
  );
}

export default EditVideo;



