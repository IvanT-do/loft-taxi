import React, {useEffect, useMemo} from "react";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AuthProvider from "./utils/AuthProvider";
import Template from "./pages/Template";

export default function App() {
    const [currentPage, setCurrentPage] = React.useState("auth");
    const [loggedIn, setLoggedIn] = React.useState(false);

    const navigateTo = (page) => {
        setCurrentPage(page);
    }

    useEffect(() => {
        if(!loggedIn && !["auth", "register"].includes(currentPage)){
            setCurrentPage("auth");
        }
    });

    const login = (email, password) => {
        if(email === "test@test.com" && password === "123123"){
            setLoggedIn(true);
        }
    }

    const logout = () => {
        setLoggedIn(false);
    }

    const authContext = useMemo(() => ({
        isLoggedIn: loggedIn,
        login,
        logout
    }), [loggedIn]);

    const pages = {
        auth: <Auth onNavigate={navigateTo} />,
        register: <Register onNavigate={navigateTo} />,
        home: <Home />,
        profile: <Profile />
    }

    // на странице авторизации карта как таковая не нужна, достаточно будет вывести background
    if(!loggedIn){
        return (
            <AuthProvider value={authContext}>
                { pages[currentPage] }
            </AuthProvider>
        )
    }

    //шаблон с картой вынес из страниц, чтобы карта не перезапускалась
    return (
        <AuthProvider value={authContext}>
            <Template onNavigate={navigateTo} name={currentPage}>
                { pages[currentPage] }
            </Template>
        </AuthProvider>
    );
}
