import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    //now the context is returned when useAuth is called
    return useContext(AuthContext);
}

export default useAuth;