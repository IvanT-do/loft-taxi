import { useNavigate } from "react-router-dom";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {userIsLogged} from "../store/mainSlice";

export default function withAuth(WrappedComponent, authenticated = false, redirectTo= "/auth"){
    return (props) => {
        const isLoggedIn = useSelector(userIsLogged);
        const navigate = useNavigate();

        useEffect(() => {
            if(isLoggedIn === authenticated) {
                navigate(redirectTo);
            }
        });

        if(isLoggedIn === authenticated)
            return null;

        return <WrappedComponent {...props} />
    }
}