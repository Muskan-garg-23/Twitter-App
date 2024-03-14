import React, {useState} from 'react';
import './App.css';
import Homepage from './Homepage';
import Inbox from './Inbox';
import Profile from './Profile';
import Noti from './Noti';
import Account from './Account';
import EditPost from './EditPost';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {

  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setUserData(userData);
    navigate('/home');
  };

  return (
    <div className="App">
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Account onLogin={handleLogin} />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/noti" element={<Noti />} />
          <Route path="/profile" element={<Profile userData={userData} />} />
          <Route path="/editPost" element={<EditPost/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
