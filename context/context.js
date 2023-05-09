import { createContext, useState } from "react";
export const Context = createContext();

function Provider({ children }) {
  const [shutterEffect, setShutterEffect] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [deletedUsers, setDeletedUsers] = useState([]);

  return (
    <Context.Provider
      value={{
        shutterEffect,
        setShutterEffect,
        showPasswordModal,
        setShowPasswordModal,
        deletedUsers,
        setDeletedUsers,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Provider;
