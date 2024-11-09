import { useRef } from "react";
import { useAuth } from "../store/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { loading, error, setError, signInWithGoogle, signIn } = useAuth();
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async () => {
    try {
      const success = await signIn(
        emailRef.current.value,
        passwordRef.current.value,
        navigate
      );
      if (success) {
        emailRef.current.value = "";
        passwordRef.current.value = "";
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      {error && alert(error)}
      <div className="flex flex-col bg-[#040E1A] w-full sm:w-[400px] items-center gap-6 py-6 rounded-lg shadow-lg shadow-blue-300">
        <h1 className="text-4xl font-bold">Sign in</h1>
        <div className="w-full flex items-center flex-col gap-3">
          <label
            htmlFor="Email"
            className="self-start sm:pl-8 pl-3 text-gray-300 "
          >
            Email
          </label>
          <input
            type="email"
            id="Email"
            ref={emailRef}
            placeholder="your@gmail.com"
            className="sm:w-[85%] w-[95%] bg-[#05070A] border-[1px] border-solid border-blue-700 rounded-lg px-4 py-2 outline-none"
          />
        </div>
        <div className="w-full flex items-center flex-col gap-3">
          <label
            htmlFor="Password"
            className="self-start sm:pl-8 pl-3 text-gray-300 "
          >
            Password
          </label>
          <input
            type="password"
            id="Password"
            ref={passwordRef}
            placeholder="******"
            className="sm:w-[85%] w-[95%] bg-[#05070A] border-[1px] border-solid border-blue-700 rounded-lg px-4 py-2 outline-none"
          />
        </div>
        <div className="w-full flex items-center justify-center sm:hidden text-red-600">
          {error && error}
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`bg-[#F1F4F8] border-[1px] border-gray-500 sm:w-[85%] w-[95%] rounded-lg text-lg font-semibold text-black py-1 ${
            loading ? "opacity-60" : ""
          }`}
        >
          {loading ? "Please wait..." : "Sign in"}
        </button>
        <p>
          Dont&apos;t have an account? <Link to="/Signup">Sign up</Link>
        </p>
        <div className="flex items-center sm:w-[85%] w-[95%]">
          <div className="flex-grow border-t border-gray-500"></div>
          <span className="px-3 text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-500"></div>
        </div>
        <button
          onClick={() => signInWithGoogle(navigate)}
          disabled={loading}
          className={`bg-[#05070A] border-[1px] border-gray-500 sm:w-[85%] w-[95%] rounded-lg text-md font-semibold py-2 text-white flex items-center justify-center gap-9 ${
            loading ? "opacity-60 " : ""
          }`}
        >
          <img
            src="/google.webp"
            alt="Google Logo"
            className="h-7 w-7 object-cover"
          />
          <p>Sign in with Google</p>
        </button>
      </div>
    </div>
  );
};

export default Login;
