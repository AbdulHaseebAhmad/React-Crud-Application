import React, { useState, useEffect} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  /**
   * The loginHandler function gets executed when it recieves data from login Component and send a fetch request to the firebase
   * the data from login components contain name, choosesn Sector & SubSector and is added to the firebase
   * the loginHandler then set isLogged in to true
   * and also stores a key pair in local storage with the key being isLogged and its value is  the node name from the response of fetch request
   */

  const loginHandler = async (Data) => {
    const sendData = await fetch("https://chris-cd3a5-default-rtdb.firebaseio.com/Data.json",{
      method:"POST",
      body:JSON.stringify(Data),})
    const response = await sendData.json();
    const userID = response.name;
    localStorage.setItem("isLoggedIn", userID);
    setIsLoggedIn(true);}

    /**
     * The logOut Handler is used to delete the isLoggedin key from localstorage
     * also it change isLogged in state to false as well so the useEffect below it can re run and hide the components that are only visible to people who has isLogged in true
     */
   const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);};
/**
 * The useEffect below checks for a true value for the isLogged key in the localstorage 
 * if the response is true then the loggedIn state is made true
 * This keeps the user Logged in
 */
  useEffect(()=>{
    const userLogInfo = localStorage.getItem("isLoggedIn");
    if (userLogInfo){
      setIsLoggedIn(true);
    }
  },[isLoggedIn])

  const valueForContext={
      isLoggedIn:isLoggedIn,
      onLogOut:logoutHandler,
      onLogin:loginHandler}


  return (
    <AuthContext.Provider value={valueForContext}>
      <MainHeader />
      <main>
        {!isLoggedIn && <Login/>}
        {isLoggedIn && <Home />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
