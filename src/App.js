import React,{useRef, useEffect, useState} from "react";
import './App.css';
import AppsIcon from '@mui/icons-material/Apps';
import Button from '@mui/material/Button';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import classNames from "classnames";
import  Gallery  from './components/Gallery.jsx';
import { StayPrimaryLandscape } from "@mui/icons-material";
function App() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  
  const [captured, setCaptured] = useState(false)
  
  const getStream = () => {
    if(!captured){
      navigator.mediaDevices.getUserMedia({
        video: {width: 342, height: 291}
      })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
        
  
      })
      .catch(err => {
        console.error(err);
      })
    }else {
      console.log(captured);
    }
    
  }

  

  const takePhoto = () => {
    const width = 342;
    const height =  291;

    let video = videoRef.current;
    let photo = photoRef.current;
    
    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width,height);
    setCaptured(true)
    console.log(ctx);
    
  }

  const newPicture = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");

    ctx.clearRect(0,0,photo.width, photo.height)
    setCaptured(false)
    getStream()
  }

  
  useEffect(() => {
    getStream()
  },[videoRef,captured])



  let customClass = classNames({'stream__Box status': !captured, 'stream__Box':captured })
  return (
    <div className="App">
      <div className='galleryIcon__Container'>
      <AppsIcon  style={{ fontSize:45,color: 'white' }} 
       />
      </div>
      
      <div className='stream__Container'>

        
        {!captured && <div className='stream__Box'>
          <video ref={videoRef}></video>
        </div>}
        
        <div className={customClass} >
        <canvas  ref={photoRef}></canvas>
        </div>
      </div>
      <div className='button__Container'>
     {!captured && <Button onClick={takePhoto} variant="outlined" startIcon={<CameraAltIcon />} style={{
        color: "white",
        fontSize: "20px",
        
      }}>
  Föreviga ett ögonblick
  </Button>}

  {captured && <Button onClick={newPicture} variant="outlined" startIcon={<CameraAltIcon />} style={{
        color: "white",
        fontSize: "20px",
        
      }}>
  Fånga ett nytt ögonblick
</Button>}
      </div>
      
    </div>
  );
}

export default App;
