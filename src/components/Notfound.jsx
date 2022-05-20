import React from 'react'
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
const Notfound = () => {
    let navigate = useNavigate();
  return (
    <div className='App' style={{display:"flex",flexDirection:"column",width:"100vw",height:"100vh", alignItems:"center",justifyContent:"center"}}>
        <h1 style={{display:"flex",justifyContent:"center", color:"white"}}>Error 404, Page not found! Please return to the main page</h1>
        <Button onClick={() => {navigate('/')}} variant="outlined"  style={{
        color: "white",
        fontSize: "18px",
        margin: "10px",
        
        
        
      }}><h1>RETURN HOME</h1></Button>
    
    </div>
  )
}

export default Notfound