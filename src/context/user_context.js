import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const { user, isAuthenticated, loginWithRedirect, logout, isLoading } =
    useAuth0();

  const [curUser, setCurUser] = useState(null);

  useEffect(() => {
    // console.log("user ", user);
    // console.log(`isAuthenticated ${isAuthenticated}`);
    // console.log(`isLoading ${isLoading}`);
    if (user) {
      setCurUser(user);
    } else setCurUser(false);
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        loginWithRedirect,
        logout,
        isLoading,
        curUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
