import React,{useRef, useEffect, useState} from "react";
import './App.css';
import AppsIcon from '@mui/icons-material/Apps';
import Button from '@mui/material/Button';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import  Gallery  from './components/Gallery.jsx';
function App() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);


  const [captured, setCaptured] = useState(false)

  const getStream = () => {
    navigator.mediaDevices.getUserMedia({
      video: {width: 1920, height: 1080}
    })
    .then(stream => {
      let video = videoRef.current;
      video.srcObject = stream;
      video.play();

    })
    .catch(err => {
      console.error(err);
    })
  }

  useEffect(() => {
    getStream();
  },[videoRef])

  return (
    <div className="App">
      <div className='galleryIcon__Container'>
      <AppsIcon  sx={{ fontSize:45 }} 
       color='primary'/>
      </div>
      
      <div className='stream__Container'>
        <div className='stream__Box'>
          <video ref={videoRef}>

          </video>
        </div>
        
      </div>
      <div className='button__Container'>
      <Button variant="outlined" startIcon={<CameraAltIcon />} style={{
        fontSize: 20,
        
      }}>
  Föreviga ett ögonblick
</Button>
      </div>
      


      
    </div>
  );
}

export default App;


/**
 * 
 * 
 * 
 * 
 * 
 */