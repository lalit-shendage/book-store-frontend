import React, { useContext } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import '../assets/Auth.css'

const Auth = () => {
    const handleClick = (e) => {
        e.stopPropagation();
      };
  return (
    <div className="auth-container">
      <Flippy>
        {/* Front side */}
        <FrontSide className="cardbody">
        <div className="card" onClick={handleClick}>
          <SignUp />
         </div>
         <span className="alt"> if you already have an account:<button className="btnn">sign in</button></span>

        </FrontSide>

        {/* Back side */}
        <BackSide >
            <div className="card" onClick={handleClick}>
          <SignIn />
          </div>
          <span className="alt">Dont have an account? <button className="btnn">Sign up</button></span>
        </BackSide>
      </Flippy>
    </div>
  );
};

export default Auth;
