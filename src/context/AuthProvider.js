import { createContext, useState } from "react";

//context enables use to share data across our components, such as authenticated user or not
//now we can pass the state to each component
const AuthContext = createContext({});

//we accept the children, which are the componetns
export const AuthProvider = ({ children }) => {
    //the authentication state 
    const [auth, setAuth] = useState({});
    return (
        //provide those to the children that call it
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
