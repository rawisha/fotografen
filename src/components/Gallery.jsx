import React, { useEffect, useState } from 'react'
import "../App.css"
import { useNavigate } from "react-router-dom";
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
function Gallery() {
    let images;
    const [local,setLocal] = useState(localStorage.getItem("images") || [])
    
    
    if(local.length !== 0){
        images = JSON.parse(local);
    }
    
    

    let navigate = useNavigate();
    const data = []

    const deleteLocal = (key,data) => {
        localStorage.removeItem("images",images[key])
        console.log(images.length);
    }

   

  return (
    <div className='Gallery'>
        
        <h1>Collection</h1>
        <div className="backButton__Container">
        <ArrowBackRoundedIcon style={{fontSize: 40,color:"white",cursor:"pointer"}} onClick={() => {navigate("/")}}/>
        <h2 onClick={() => {navigate("/")}}>BACK</h2>
        </div>
        <div className='picture__Grid' >
        {local.length > 0 ?
        
        images.map((image,index) => (
            
            <div className="picture__box" key={index}>
                <div className="deleteButton__Container">
                <HighlightOffTwoToneIcon style={{ fontSize:40,color: 'white', cursor:'pointer' }} onClick={() => deleteLocal(index,image)}/>
                </div>
            <div className="image__container">
            <img  src={image.src} alt={image.date} />
                <p style={{color: "white"}}>{image.date}</p>
            </div>
            
            
        </div>
        ))
            : <h3>Nothing in your collection</h3>
       }
       </div>


    </div>
  )
}

export default Gallery