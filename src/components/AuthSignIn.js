import React from "react";
import { useAuth } from "../use-auth";

function App() {

  const auth = useAuth();
  
  return (
    <div className='user-area'>
        {auth.user ? (
            <div className='logged-in'>
                <img src={auth.user.photoURL} alt='profile'/>
                <div className='email'>{auth.user.email}</div>
                <button onClick={() => auth.signout()}>Signout</button>
            </div>
            
        ) : (
            <button onClick={() => auth.signin()}>Signin</button>
        )}
    </div>
  );
}

export default App;
