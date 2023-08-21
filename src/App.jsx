import { useRef, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
const cookies = new Cookies();

function App() {
  const roomInputRef = useRef();

  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };
  if (!isAuth) {
    return (
      <>
        <Auth setIsAuth={setIsAuth} />
      </>
    );
  }

  return (
    <>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room">
          <label>Input Room</label>
          <input type="text" ref={roomInputRef} />
          <button
            onClick={() => {
              setRoom(roomInputRef.current.value);
            }}
          >
            Enter Chat
          </button>
        </div>
      )}
      <div className="sign-out">
        <button className="sign-out" onClick={signUserOut}>Sign Out</button>
      </div>
    </>
  );
}

export default App;
