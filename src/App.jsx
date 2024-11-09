import Signup from "./components/Signup";
import Login from "./components/Login";
import Message from "./components/Message";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MessageProvider } from "./store/MessageContext";

const router = createBrowserRouter([
  { path: "/Signup", element: <Signup /> },
  { path: "/Login", element: <Login /> },
  { path: "/", element: <Message /> },
]);

const App = () => (
  <AuthProvider>
    <MessageProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </MessageProvider>
  </AuthProvider>
);

export default App;
