import React, { useState } from "react";
import { useMessages } from "../store/MessageContext";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { addMessage } = useMessages();

  const handleSend = () => {
    if (text.trim()) {
      addMessage(text);
      setText("");
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-gray-700 p-2 rounded-lg shadow-md">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 bg-gray-800 text-gray-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition duration-150"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
