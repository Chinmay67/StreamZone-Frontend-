
import { useRecoilValue } from 'recoil'
import { videoAtom } from '../../Store/atoms/videoAtoms'
import Homepage from '../VideoDisplay/Homepage'
import VideoPlay from './VideoPlay'
import { useParams } from 'react-router-dom'

function VideoView() {
    // const currentVideo=useRecoilValue(videoAtom)
    const id=useParams();
    

  return (
    <div>
      {id && <VideoPlay/> }
      {!id && <Homepage/>}
       
    </div>
  )
}

export default VideoView
