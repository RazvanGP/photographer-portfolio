import { useState, useEffect } from "react";
import LoginModal from "../components/loginModal";
import userbase from "userbase-js";
import UploadFilesModal from "../components/uploadFilesModal";
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
    <div>
      {currentUserId !== process.env.NEXT_PUBLIC_ADMIN_ID ? (
        <LoginModal onLoginSuccess={handleOnLoginSuccess} />
      ) : (
        <UploadFilesModal />
      )}
    </div>
  );
};

export default Admin;
