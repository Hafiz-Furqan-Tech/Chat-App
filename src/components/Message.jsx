import React, { useEffect } from "react";
import { MessageProvider } from "../store/MessageContext";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utilities/firebase";
import { useNavigate } from "react-router-dom";

function Message() {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/Login");
      }
    });
  }, [navigate]);
  return (
    <MessageProvider>
      <div
        id="root"
        className="min-h-screen flex flex-col bg-gray-900 text-white"
      >
        <header className="bg-gray-800 py-4 shadow-lg text-center">
          <h1 className="text-2xl font-semibold text-gray-100">Chat App</h1>
        </header>

        <main className="flex-1 p-4 overflow-y-auto">
          <MessageList />
        </main>

        <footer className="bg-gray-800 p-4">
          <MessageInput />
        </footer>
      </div>
    </MessageProvider>
  );
}

export default Message;
