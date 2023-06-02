import { createContext, useState } from "react";
export const Context = createContext();

function Provider({ children }) {
  const [shutterEffect, setShutterEffect] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Context.Provider
      value={{
        shutterEffect,
        setShutterEffect,
        showPasswordModal,
        setShowPasswordModal,
        deletedUsers,
        setDeletedUsers,
        menuOpen,
        setMenuOpen,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Provider;
