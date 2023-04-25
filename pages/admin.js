import { useState, useEffect } from "react";
import LoginModal from "../components/loginModal";
import userbase from "userbase-js";
const Admin = () => {
  //   const [showLoginModal, setShowLoginModal] = useState(true);
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    sessionStorage.getItem("user")
      ? setCurrentUserId(sessionStorage.getItem("user"))
      : setCurrentUserId("");
  }, []);

  const handleOnLoginSuccess = async (userId) => {
    (await userId) === sessionStorage.getItem("user")
      ? setCurrentUserId(userId)
      : console.log("Please login");
  };

  return (
    <div
      style={{
        visibility: !currentUserId ? "visible" : "hidden",
      }}
    >
      <LoginModal onLoginSuccess={handleOnLoginSuccess} />
    </div>
  );
};

export default Admin;
