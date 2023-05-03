import { useState } from "react";
import userbase from "userbase-js";

const LoginModal = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  async function handleLogIn(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await userbase.signIn({
        username,
        password,
        rememberMe: "none",
      });

      onLoginSuccess(user.userId);
      sessionStorage.setItem("user", user.userId);
      setLoading(false);
    } catch (e) {
      onLoginSuccess(false);
      setLoading(false);
      setError(e.message);
    }
  }

  async function handleLogOut() {
    try {
      const res = await userbase.signOut();
      console.log(res);
      dispatch(removeUser());
      sessionStorage.setItem("user", "");

      console.log(sessionStorage.getItem(user));
    } catch (e) {
      console.error(e.message);
    }
  }

  // async function handleForgotPassword(e) {
  //   try {
  //     const user = await userbase.forgotPassword({ username: "admin" });
  //     console.log(user);
  //   } catch (e) {
  //     setError(e.message);
  //   }
  // }

  return (
    <div className="w-full bg-slate-800 h-screen flex justify-center items-center">
      <form
        id="login-form"
        className="flex flex-col items-center justify-center gap-5"
      >
        <div>
          <label
            className="block text-purple-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-1 rounded-md"
          />
        </div>
        <div>
          <label
            className="block text-purple-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-1 rounded-md"
          />
        </div>

        <div className="w-full flex items-center justify-around">
          <button
            disabled={loading}
            className="border-2 border-purple-500 text-purple-500 rounded-xl p-2 hover: cursor-pointer"
            onClick={handleLogIn}
          >
            {loading ? "Logging In ..." : "Log In"}
          </button>

          {/* <button
            disabled={loading}
            className="border-2 border-purple-500 text-purple-500 rounded-xl p-2 hover: cursor-pointer"
            onClick={handleSignUp}
          >
            {loading ? "Signing up ..." : "Sign Up"}
          </button> */}

          <button
            disabled={loading}
            className="border-2 border-purple-500 text-purple-500 rounded-xl p-2 hover: cursor-pointer"
            onClick={handleLogOut}
          >
            {loading ? "Logging out ..." : "Log Out"}
          </button>
        </div>

        <p className="text-red-500 font-bold">{error}</p>
      </form>
    </div>
  );
};

export default LoginModal;
