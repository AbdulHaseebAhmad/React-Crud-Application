import React, { useState, useEffect} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = async (Data) => {
    const sendData = await fetch("https://chris-cd3a5-default-rtdb.firebaseio.com/Data.json",{
      method:"POST",
      body:JSON.stringify(Data),})
    const response = await sendData.json();
    const userID = response.name;
    localStorage.setItem("isLoggedIn", userID);
    setIsLoggedIn(true);}
   
   const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  useEffect(()=>{
    const userLogInfo = localStorage.getItem("isLoggedIn");
    if (userLogInfo){
      setIsLoggedIn(true);
    }
  },[isLoggedIn])

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} userId={localStorage.getItem("isLoggedIn")}/>}
      </main>
    </React.Fragment>
  );
}

export default App;
