import React, { useState, createContext, useContext } from "react";

const AppContext = createContext({
  token: null,
  currentUser: null,
  role: null,
  setToken: () => {},
  setCurrentUser: () => {},
  setRole: () => {},
  isAuthenticated: false,
});

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // React.useEffect(() => {
  //   if(token)
  //   localStorage.setItem("isAuthenticated", true);
  // }, [isAuthenticated]);

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        currentUser,
        isAuthenticated,
        setIsAuthenticated,
        setCurrentUser,
        role,
        setRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AppContext);
};

export { AuthProvider, useAuthContext };
