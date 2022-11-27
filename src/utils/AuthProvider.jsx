import React, {useContext} from "react";

const context = React.createContext({isLoggedIn: false});
context.displayName = "AuthContext"

export default context.Provider;

export const useAuth = () => useContext(context);