import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
import Picture from './components/Picture';
import Gallery from './components/Gallery';
import Notfound from './components/Notfound';
import { useEffect } from 'react';
let req = new XMLHttpRequest();

function App() {


   // FIX THIS PART !!
  const existingImage = JSON.parse(localStorage.getItem("images"))

  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      console.log(req.responseText);
    }
  };

  const uploadToBin = () => {
    req.open("POST", `https://api.jsonbin.io/v3/b/`, true);
  req.setRequestHeader("Content-Type", "application/json");
  req.setRequestHeader("X-Master-Key", "$2b$10$Vmvw5pPI7YyGjkJeoqwABeiLic7ZFW2BSZmpzHo4jDzvTKauH3ub.");
  req.setRequestHeader("X-Collection-Id", "62899132449a1f3821e8a9a0");
  req.setRequestHeader("X-Bin-Name", "localStorage-Sync");
  req.send('{"sample": 0}');
  }

  
/**
 *  req.open("POST", `https://api.jsonbin.io/v3/b/`, true);
  req.setRequestHeader("Content-Type", "application/json");
  req.setRequestHeader("X-Master-Key", "$2b$10$Vmvw5pPI7YyGjkJeoqwABeiLic7ZFW2BSZmpzHo4jDzvTKauH3ub.");
  req.send('{"sample": 0}');

 */
     // FIX THIS PART !!   // FIX THIS PART !!

  useEffect(() => {
    Notification.requestPermission()
    uploadToBin()
  },[])
  return (
    <div className="App">
      
      <Router>
        <Routes>
        <Route path='/' element={<Picture />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='*' element={<Notfound />} />
        </Routes>
    </Router>
    
    </div>
  );
}

export default App;
