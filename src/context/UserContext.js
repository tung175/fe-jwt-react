import React, { useEffect, useState } from "react";
import { getUserAccount } from "../services/userService";

const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
  const userDefault = {
    isLoading: true,
    isAuthenticated: false,
    access_token: "",
    account: {},
  };

  const [user, setUser] = useState(userDefault);

  const loginContext = (userData) => {
    setUser({ ...userData, isLoading: false });
  };

  const logoutContext = () => {
    setUser((user) => ({
      name: "",
      auth: false,
    }));
  };

  const fetchUser = async () => {
    let res = await getUserAccount();
    if (res && res.EC === 0) {
      let { groupWithRoles, email, username, access_token } = res.DT;

      let data = {
        isLoading: false,
        isAuthenticated: true,
        access_token,
        account: {
          groupWithRoles,
          email,
          username,
        },
      };
      setUser(data);
    } else {
      setUser({ ...userDefault, isLoading: false });
    }
  };

  useEffect(() => {
    if (
      window.location.pathname !== "/" ||
      window.location.pathname !== "/login"
    ) {
      fetchUser();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
