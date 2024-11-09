// import React, { useState } from "react";
// import { useMessages } from "../store/MessageContext";
// import { auth } from "../utilities/firebase";

// const MessageList = () => {
//   const {
//     messages,
//     editMessage,
//     deleteMessageForMe,
//     deleteMessageForEveryone,
//   } = useMessages();

//   const [editingMessageId, setEditingMessageId] = useState(null);
//   const [editedText, setEditedText] = useState("");

//   const handleEditClick = (msg) => {
//     setEditingMessageId(msg.id);
//     setEditedText(msg.text);
//   };

//   const handleSubmitEdit = () => {
//     if (editedText.trim() !== "") {
//       editMessage(editingMessageId, editedText);
//       setEditingMessageId(null);
//       setEditedText("");
//     }
//   };

//   return (
//     <div className="space-y-4">
//       {messages.map((msg) => (
//         <div
//           key={msg.id}
//           className="bg-gray-800 rounded-lg p-4 shadow-md relative"
//         >
//           <p className="text-sm text-gray-400">User: {msg.senderId}</p>
//           {editingMessageId === msg.id ? (
//             <div>
//               <input
//                 type="text"
//                 className="w-full p-2 bg-gray-700 rounded text-white"
//                 value={editedText}
//                 onChange={(e) => setEditedText(e.target.value)}
//               />
//               <button
//                 className="text-blue-400 hover:text-blue-300 text-sm mt-2"
//                 onClick={handleSubmitEdit}
//               >
//                 Submit Edit
//               </button>
//             </div>
//           ) : (
//             <p className="text-lg text-gray-100">
//               {msg.text}
//               {msg.isEdited && (
//                 <span className="text-sm text-gray-500"> (Edited)</span>
//               )}
//             </p>
//           )}

//           <div className="flex gap-2 mt-2">
//             {msg.senderId === auth.currentUser.uid ? (
//               <>
//                 <button
//                   className="text-red-600 hover:text-red-500 text-sm"
//                   onClick={() => deleteMessageForEveryone(msg.id)}
//                 >
//                   Delete for Everyone
//                 </button>
//                 <button
//                   className="text-red-400 hover:text-red-300 text-sm"
//                   onClick={() => deleteMessageForMe(msg.id)}
//                 >
//                   Delete for Me
//                 </button>
//                 <button
//                   className="text-blue-400 hover:text-blue-300 text-sm"
//                   onClick={() => handleEditClick(msg)}
//                 >
//                   Edit
//                 </button>
//               </>
//             ) : (
//               <button
//                 className="text-red-400 hover:text-red-300 text-sm"
//                 onClick={() => deleteMessageForMe(msg.id)}
//               >
//                 Delete for Me
//               </button>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MessageList;

import React, { useState } from "react";
import { useMessages } from "../store/MessageContext";
import { auth } from "../utilities/firebase";

const MessageList = () => {
  const {
    messages,
    editMessage,
    deleteMessageForMe,
    deleteMessageForEveryone,
  } = useMessages();

  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleEditClick = (msg) => {
    setEditingMessageId(msg.id);
    setEditedText(msg.text);
  };

  const handleSubmitEdit = () => {
    if (editedText.trim() !== "") {
      editMessage(editingMessageId, editedText);
      setEditingMessageId(null);
      setEditedText("");
    }
  };

  return (
    <div className="space-y-4">
      {messages
        .filter((msg) => {
          // If message is deleted for everyone, do not display it
          return (
            !msg.isDeletedForEveryone &&
            (!msg.isDeletedForMe ||
              !msg.isDeletedForMe.includes(auth.currentUser.uid))
          );
        })
        .map((msg) => (
          <div
            key={msg.id}
            className="bg-gray-800 rounded-lg p-4 shadow-md relative"
          >
            <p className="text-sm text-gray-400">User: {msg.senderId}</p>
            {editingMessageId === msg.id ? (
              <div>
                <input
                  type="text"
                  className="w-full p-2 bg-gray-700 rounded text-white"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button
                  className="text-blue-400 hover:text-blue-300 text-sm mt-2"
                  onClick={handleSubmitEdit}
                >
                  Submit Edit
                </button>
              </div>
            ) : (
              <p className="text-lg text-gray-100">
                {msg.text}
                {msg.isEdited && (
                  <span className="text-sm text-gray-500"> (Edited)</span>
                )}
              </p>
            )}

            <div className="flex gap-2 mt-2">
              {msg.senderId === auth.currentUser.uid ? (
                <>
                  <button
                    className="text-red-600 hover:text-red-500 text-sm"
                    onClick={() => deleteMessageForEveryone(msg.id)}
                  >
                    Delete for Everyone
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300 text-sm"
                    onClick={() => deleteMessageForMe(msg.id)}
                  >
                    Delete for Me
                  </button>
                  <button
                    className="text-blue-400 hover:text-blue-300 text-sm"
                    onClick={() => handleEditClick(msg)}
                  >
                    Edit
                  </button>
                </>
              ) : (
                <button
                  className="text-red-400 hover:text-red-300 text-sm"
                  onClick={() => deleteMessageForMe(msg.id)}
                >
                  Delete for Me
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default MessageList;
