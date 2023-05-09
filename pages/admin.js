import { useState, useEffect, useContext } from "react";
import LoginModal from "../components/loginModal";
import userbase from "userbase-js";
import UploadFilesModal from "../components/uploadFilesModal";
import PasswordModal from "../components/passwordModal";
import { Context } from "../context/context";

const Admin = () => {
  //   const [showLoginModal, setShowLoginModal] = useState(true);

  const [currentUserId, setCurrentUserId] = useState();
  const { showPasswordModal } = useContext(Context);

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
    <div className="relative h-full">
      <div className="flex flex-col-reverse w-full h-screen items-center justify-center gap-5">
        <LoginModal
          onLoginSuccess={handleOnLoginSuccess}
          onLogout={() => setCurrentUserId(undefined)}
        />
        {currentUserId === process.env.NEXT_PUBLIC_ADMIN_ID && (
          <UploadFilesModal />
        )}
      </div>
      {showPasswordModal && <PasswordModal />}
    </div>
  );
};

export default Admin;
