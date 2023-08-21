import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import "../styles/Auth.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();
function Auth({ setIsAuth }) {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth">
      <p>Sign in with Google</p>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}

export default Auth;
