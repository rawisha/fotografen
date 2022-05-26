import React,{useRef, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import AppsIcon from '@mui/icons-material/Apps';
import Button from '@mui/material/Button';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import classNames from "classnames";
import icon from "../asset/icon.png"
const API_KEY = process.env.REACT_APP_API_KEY;
const BIN_KEY = process.env.REACT_APP_BIN_KEY
let req = new XMLHttpRequest();

const Picture = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const existingImage = JSON.parse(localStorage.getItem("images")) || []
  const [image, setImage] = useState(existingImage)
  const [captured, setCaptured] = useState(false)
  let online = useRef(navigator.onLine)
  let navigate = useNavigate();
 
  


  
 



  const NotificationHandler = () => {
    if(Notification.permission === "granted"){
      new Notification("Bröllopsfotografen", {
        body: "Picture saved !",
        icon: icon
      })
    } else if (Notification.permission !== "denied"){
      Notification.requestPermission().then(permission => {
        console.log(permission);
      })
    }
   
  }
  
  

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
      return 
    }
    
  }

  // API CALLS AND SYNC
  const uploadToBin = () => {
    req.open("POST", `https://api.jsonbin.io/v3/b/`, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", API_KEY);
    req.setRequestHeader("X-Collection-Id", "62899132449a1f3821e8a9a0");
    req.setRequestHeader("X-Bin-Name", "localStorage-Sync");
  
    const dataUpload = {
      "images": existingImage
    }
  
    req.send(JSON.stringify(dataUpload));
    
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
    const canvas = document.getElementById("canvas")
    
    const date = new Date();
    const stringDate = date.toISOString().slice(0,10).replace(/-/g,"-");
    const id = image.length;
    const imageData = ({id:id,src: canvas.toDataURL("image/webp"), date: stringDate});
    
    
    setImage([...image,imageData])
    localStorage.setItem('images', JSON.stringify(imageData));
    NotificationHandler()
    
    if(navigator.onLine){
      uploadToBin()
    }else{
      return
    }
    
  }

  

  const newPicture = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");

    ctx.clearRect(0,0,photo.width, photo.height)
    setCaptured(false)
    getStream()
  }


  // USE EFFECTS
  
  useEffect(() => {
    localStorage.setItem("images", JSON.stringify(image))
    getStream(); 
    
  },[videoRef,captured,image]) 

 

 if(online.current){
  console.log("online")}else{
    console.log("offline");
  }


  let customClass = classNames({'stream__Box status': !captured, 'stream__Box':captured })
  return (
    <div className='App'>
          <div className='galleryIcon__Container'>
      <AppsIcon onClick={() => {navigate("/gallery")}}  style={{ fontSize:45,color: 'white', cursor:'pointer' }} 
       />
       
      </div>
      
      <div className='stream__Container'>

        
        {!captured && <div className='stream__Box'>
          <video ref={videoRef}></video>
        </div>}
        
        <div className={customClass} >
        <canvas id="canvas" ref={photoRef}></canvas>
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
  )
}

export default Picture