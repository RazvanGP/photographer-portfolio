import { useState, useEffect } from "react";
import userbase from "userbase-js";
import Loader from "./loader";

const LoginModal = ({ onLoginSuccess, onLogout }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      setIsLoggedIn(true);
    }
  });

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
      setIsLoggedIn(true);
      console.log({ user });
      try {
        const res = await fetch(
          `https://v1.userbase.com/v1/admin/apps/${process.env.NEXT_PUBLIC_USERBASE_APP_ID}/users`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_ACCESS_TOKEN}`,
            },
          }
        );
        const data = await res.json();
        console.log(data);
      } catch (err) {
        setError(err.message);
      }

      setLoading(false);
    } catch (err) {
      onLoginSuccess(false);
      setLoading(false);
      setError(err.message);
    }
  }

  async function handleLogOut() {
    try {
      const res = await userbase.signOut();
      console.log(res);
      sessionStorage.removeItem("user");
      onLogout();
      setIsLoggedIn(false);
    } catch (err) {
      console.log(err);
      if (err.message === "Not signed in.") {
        //forced log out
        sessionStorage.removeItem("user");
        onLogout();
        setIsLoggedIn(false);
      }
    }
  }

  return (
    <div className="w-48 flex justify-center items-center">
      {!isLoggedIn && (
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
              disabled={loading}
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
              disabled={loading}
              id="password"
              type="password"
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-1 rounded-md"
            />
          </div>
          {loading ? (
            <Loader />
          ) : (
            <button
              className="w-full border-2 border-purple-500 text-purple-500 rounded-xl p-2 hover: cursor-pointer"
              onClick={handleLogIn}
            >
              Log In
            </button>
          )}

          {/* <button
            disabled={loading}
            className="border-2 border-purple-500 text-purple-500 rounded-xl p-2 hover: cursor-pointer"
            onClick={handleSignUp}
          >
            {loading ? "Signing up ..." : "Sign Up"}
          </button> */}

          <p className="text-red-500 font-bold">{error}</p>
        </form>
      )}
      {isLoggedIn && (
        <button
          disabled={loading}
          className="w-full border-2 border-red-800 text-red-800 rounded-xl p-2 hover: cursor-pointer"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      )}
    </div>
  );
};

export default LoginModal;
