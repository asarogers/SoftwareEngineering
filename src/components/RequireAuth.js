import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log("working",allowedRoles?.includes(auth.roles))

    return (
        //checks if the role that has been authenticated is in the allowedRoles
        allowedRoles?.includes(auth.roles) ?
            //allowedRoles.indexOf(auth.roles) !=== -1?
            //if it is, allowed the nested routes to render
            <Outlet /> :
            //else, if there is a user, but they are not allowed
            auth?.user ?
                //send them to the unauthenticated page
                <Navigate to="/unauthorized" state={{ from: location }} replace /> :
                //if there is not a user, send them to the login page
                <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;