import React, { createContext, useState, useEffect } from "react";

export const LoginContext = createContext();

function LoginContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const tempUser = await JSON.parse(localStorage.getItem("ToDoUser"));
      setUser(tempUser);
      setLoading(false);
    })();
  }, []);

  if (!loading) {
    return (
      <LoginContext.Provider value={{ user, setUser }}>
        {children}
      </LoginContext.Provider>
    );
  }
}
export default LoginContextProvider;
