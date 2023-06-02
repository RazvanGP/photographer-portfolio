import { createContext, useState } from "react";
export const Context = createContext();

function Provider({ children }) {
  const [shutterEffect, setShutterEffect] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [photoViewerOpen, setPhotoViewerOpen] = useState(false);

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
        photoViewerOpen,
        setPhotoViewerOpen,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Provider;
