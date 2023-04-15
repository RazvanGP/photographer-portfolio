import { createContext, useState } from "react";
export const Context = createContext();

function Provider({ children }) {
  const [shutterEffect, setShutterEffect] = useState(false);

  return (
    <Context.Provider value={{ shutterEffect, setShutterEffect }}>
      {children}
    </Context.Provider>
  );
}

export default Provider;
