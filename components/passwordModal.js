import { useState, useEffect, useContext } from "react";
import userbase from "userbase-js";
import { Context } from "../context/context";

const PasswordModal = () => {
  const [password, setPassword] = useState("");
  const { setShowPasswordModal, setDeletedUsers, deletedUsers } =
    useContext(Context);

  useEffect(() => {
    console.log(deletedUsers);
  }, [deletedUsers]);

  const handlePasswordCheck = async () => {
    try {
      //userbase docs: to delete a user should be logged in
      const username = sessionStorage.getItem("tempUser");
      await userbase.signIn({
        username,
        password,
        rememberMe: "none",
      });
      //todo: set deletedUsers state
      setDeletedUsers((current) => [
        ...current,
        sessionStorage.getItem("tempUser"),
      ]);
      await userbase.deleteUser();
      // console.log(deletedUsers);
      console.log(`${username} has been deleted.`);
      setShowPasswordModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute h-full top-0 w-full left-0 backdrop-brightness-[10%]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 h-full">
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
          onChange={(e) => setPassword(e.target.value)}
          className="p-1 rounded-md"
        />
        <button
          className="w-1/2 mt-5 border-2 border-purple-500 text-purple-500 rounded-xl p-2 hover: cursor-pointer"
          onClick={handlePasswordCheck}
        >
          Delete event
        </button>
      </div>
    </div>
  );
};

export default PasswordModal;
