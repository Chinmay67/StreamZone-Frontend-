// // // import React, { useEffect, useState } from 'react'
// // // import { useRecoilValue } from 'recoil'
// // // import { checkUser } from '../../../Store/atoms/userAtoms'
// // // import SignupLoginButton from '../../signupLoginButton/SignupLoginButton'
// // // import { getUserVideos } from '../../../api/videoService'
// // // import { Box, Button, Stack } from '@mui/material'
// // // import HorizontalVideoCard from '../../VideoCard/HorizontalVideoCard'
// // // // import { WidthFull } from '@mui/icons-material'

// // // function EditVideo() {
// // //     const userStatus=useRecoilValue(checkUser)
// // //     const [videos,setVideos]=useState([])
// // //     useEffect(()=>{
// // //         const fetchUserVideos=async()=>{
// // //             if(userStatus){
// // //                 try {
// // //                     const response=await getUserVideos();
// // //                     console.log(response)
// // //                     setVideos(response.data)

// // //                 } catch (error) {
// // //                     console.log(error)
// // //                 }
// // //             }
// // //         }
// // //         fetchUserVideos();

// // //     },[userStatus])
// // //   return (
// // //     <>
// // //     {userStatus==true ?(
// // //         <Box>
// // //         <Box sx={{width:'50%'}}>
// // //           {videos.map((suggestion, index) => (
            
// // //             <HorizontalVideoCard
// // //               key={index}
// // //               suggestion={suggestion}
              
// // //             />
            
           
// // //           ))}
// // //         </Box>
// // //         <Button>Edit</Button>
        
// // //         </Box>
// // //     ):(<SignupLoginButton/>)}
// // //     </>
// // //   )
// // // }

// // // export default EditVideo
// import React, { useEffect, useState } from 'react';
// import { useRecoilValue } from 'recoil';
// import { checkUser } from '../../../Store/atoms/userAtoms';
// import SignupLoginButton from '../../signupLoginButton/SignupLoginButton';
// import { getUserVideos } from '../../../api/videoService';
// import { Box, Button, Stack } from '@mui/material';
// import HorizontalVideoCard from '../../VideoCard/HorizontalVideoCard';
// import EditVideoDialogBox from './EditVideoDialogBox';
// import DeleteVideoDialogbox from './DeleteVideoDialogbox';

// function EditVideo() {
//   const userStatus = useRecoilValue(checkUser);
//   const [videos, setVideos] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [deleteOpen,setDeleteOpen]=useState(false);
//   const [selectedVideo, setSelectedVideo] = useState({ title: '', description: '' });

//   useEffect(() => {
//     const fetchUserVideos = async () => {
//       if (userStatus) {
//         try {
//           const response = await getUserVideos();
//           console.log(response);
//           setVideos(response.data);
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     };
//     fetchUserVideos();
//   }, [userStatus]);

//   const handleEditClick = (video) => {
//     setSelectedVideo(video);
//     setOpen(true);
//   };
//   const handleDeleteClick = (video) => {
//     setSelectedVideo(video);
//     setDeleteOpen(true);
//   }
//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleDeleteClose = () => {
//     setDeleteOpen(false);
//   };
//   return (
//     <>
//       {userStatus ? (
//         <Box sx={{ width: '50%' }}>
//           {videos.map((video, index) => (
//             <Stack 
//               key={index} 
//               direction="row" 
//               alignItems="center" 
//               justifyContent="space-between"
//               spacing={2} 
//               mb={2} 
//             >
//               <Box sx={{ flexGrow: 1 }}>
//                 <HorizontalVideoCard suggestion={video} />
//               </Box>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => handleEditClick(video)}
//               >
//                 Edit
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => handleDeleteClick(video)}
//               >
//                 Delete
//               </Button>
//             </Stack>
//           ))}
//         </Box>
//       ) : (
//         <SignupLoginButton />
//       )}

//       <EditVideoDialogBox
//         open={open}
//         handleClose={handleClose}
//         video={selectedVideo}
//         // title={selectedVideo.title}
//         // thumbnail={selectedVideo.thumbnail}
//         // isPublished={selectedVideo.isPublished}

//       />
//       <DeleteVideoDialogbox
//       open={deleteOpen}
//       video={selectedVideo}
//       handleClose={handleDeleteClose}

//       />
//     </>
//   );
// }

// export default EditVideo;
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { checkUser } from '../../../Store/atoms/userAtoms';
import SignupLoginButton from '../../signupLoginButton/SignupLoginButton';
import { getUserVideos } from '../../../api/videoService';
import { Box, Button, Stack, IconButton, useMediaQuery, useTheme } from '@mui/material';
import HorizontalVideoCard from '../../VideoCard/HorizontalVideoCard';
import EditVideoDialogBox from './EditVideoDialogBox';
import DeleteVideoDialogbox from './DeleteVideoDialogbox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function EditVideo() {
  const userStatus = useRecoilValue(checkUser);
  const [videos, setVideos] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({ title: '', description: '' });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is small

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

  const handleDeleteClick = (video) => {
    setSelectedVideo(video);
    setDeleteOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  return (
    <>
      {userStatus ? (
        <Box
          sx={{
            width: '100%',
            maxWidth: '80%',
            margin: '0 auto',
            padding: isMobile ? 2 : 4,
          }}
        >
          {videos.map((video, index) => (
            <Stack
              key={index}
              direction={isMobile ? 'column' : 'row'}
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
              mb={2}
              sx={{ width: '100%' }}
            >
              <Box sx={{ flexGrow: 1, width: '100%' }}>
                <HorizontalVideoCard suggestion={video} />
              </Box>
              <Stack
                direction={isMobile ? 'row' : 'row'}
                spacing={isMobile ? 1 : 2}
                alignItems="center"
                sx={{ marginTop: isMobile ? 2 : 0 }}
              >
                {isMobile ? (
                  <>
                    <IconButton color="primary" onClick={() => handleEditClick(video)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDeleteClick(video)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditClick(video)}
                      sx={{ minWidth: '100px' }} // Keep button size smaller
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteClick(video)}
                      sx={{ minWidth: '100px' }} // Keep button size smaller
                    >
                      Delete
                    </Button>
                  </>
                )}
              </Stack>
            </Stack>
          ))}
        </Box>
      ) : (
        <SignupLoginButton />
      )}

      <EditVideoDialogBox
        open={open}
        handleClose={handleClose}
        video={selectedVideo}
      />
      <DeleteVideoDialogbox
        open={deleteOpen}
        video={selectedVideo}
        handleClose={handleDeleteClose}
      />
    </>
  );
}

export default EditVideo;
