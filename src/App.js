import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
import Picture from './components/Picture';
import Gallery from './components/Gallery';
import Notfound from './components/Notfound';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    Notification.requestPermission()
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
