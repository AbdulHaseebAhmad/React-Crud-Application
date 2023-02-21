import React from "react";

const AuthContext = React.createContext({
    isLoggedIn:false,
    onLogOut:() => {},
    onLogin:()=>{},
})

export default AuthContext;