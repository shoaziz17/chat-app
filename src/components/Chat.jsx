import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import "../styles/Chat.css";

function Chat({ room }) {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messageRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(messageRef, where("room", "==", room), orderBy("createAt"));
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.docs.map((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsuscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    await addDoc(messageRef, {
      text: newMessage,
      createAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });
    setNewMessage("");
  };
  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to: {room.toUpperCase()} </h1>
      </div>
      <div className="messages">
        {messages.map((message) => {
          return (
            <div className="message" key={message.id}>
              <span className="user">{message.user}</span>
              {message.text}
                           
            </div>
          );
        })}
      </div>

      <form className="new-message-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message here..."
          className="new-message-input"
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
          value={newMessage}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
