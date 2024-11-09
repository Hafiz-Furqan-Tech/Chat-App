// import React, { createContext, useContext, useEffect, useState } from "react";
// import {
//   collection,
//   addDoc,
//   onSnapshot,
//   updateDoc,
//   doc,
//   serverTimestamp,
// } from "firebase/firestore";
// import { db, auth } from "../utilities/firebase";

// const MessageContext = createContext();

// export const useMessages = () => useContext(MessageContext);

// export const MessageProvider = ({ children }) => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const q = collection(db, "messages");
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setMessages(msgs);
//     });
//     return unsubscribe;
//   }, []);

//   const addMessage = async (text) => {
//     try {
//       await addDoc(collection(db, "messages"), {
//         text,
//         senderId: auth.currentUser.uid,
//         timestamp: serverTimestamp(),
//         isDeletedForEveryone: false,
//       });
//     } catch (error) {
//       console.error("Error adding message:", error);
//     }
//   };

//   const editMessage = async (id, newText) => {
//     try {
//       const msgRef = doc(db, "messages", id);
//       await updateDoc(msgRef, {
//         text: newText,
//         isEdited: true,
//       });
//     } catch (error) {
//       console.error("Error editing message:", error);
//     }
//   };

//   const deleteMessageForMe = async (id) => {
//     try {
//       const msgRef = doc(db, "messages", id);
//       await updateDoc(msgRef, { isDeletedForMe: true });
//     } catch (error) {
//       console.error("Error deleting message for me:", error);
//     }
//   };

//   const deleteMessageForEveryone = async (id) => {
//     try {
//       const msgRef = doc(db, "messages", id);
//       await updateDoc(msgRef, { isDeletedForEveryone: true });
//     } catch (error) {
//       console.error("Error deleting message for everyone:", error);
//     }
//   };

//   return (
//     <MessageContext.Provider
//       value={{
//         messages,
//         addMessage,
//         editMessage,
//         deleteMessageForMe,
//         deleteMessageForEveryone,
//       }}
//     >
//       {children}
//     </MessageContext.Provider>
//   );
// };

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../utilities/firebase";

const MessageContext = createContext();

export const useMessages = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = collection(db, "messages");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });
    return unsubscribe;
  }, []);

  const addMessage = async (text) => {
    try {
      await addDoc(collection(db, "messages"), {
        text,
        senderId: auth.currentUser.uid,
        timestamp: serverTimestamp(),
        isDeletedForEveryone: false,
        isDeletedForMe: [], // Initialize as empty array
      });
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };

  const editMessage = async (id, newText) => {
    try {
      const msgRef = doc(db, "messages", id);
      await updateDoc(msgRef, {
        text: newText,
        isEdited: true,
      });
    } catch (error) {
      console.error("Error editing message:", error);
    }
  };

  // Delete for me - Update only for the current user
  const deleteMessageForMe = async (id) => {
    try {
      const msgRef = doc(db, "messages", id);

      // Get the current message data
      const msgDoc = await getDoc(msgRef);
      const msgData = msgDoc.data();

      // Add current user's UID to the isDeletedForMe array
      const updatedDeletedForMe = [
        ...(msgData.isDeletedForMe || []),
        auth.currentUser.uid,
      ];

      await updateDoc(msgRef, {
        isDeletedForMe: updatedDeletedForMe,
      });
    } catch (error) {
      console.error("Error deleting message for me:", error);
    }
  };

  // Delete for everyone
  const deleteMessageForEveryone = async (id) => {
    try {
      const msgRef = doc(db, "messages", id);
      await updateDoc(msgRef, {
        isDeletedForEveryone: true,
      });
    } catch (error) {
      console.error("Error deleting message for everyone:", error);
    }
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        addMessage,
        editMessage,
        deleteMessageForMe,
        deleteMessageForEveryone,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
