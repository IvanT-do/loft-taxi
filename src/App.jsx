import React from "react";
import Auth from "./pages/Auth/Auth";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";

export default function App() {
    const [currentPage, setCurrentPage] = React.useState("auth");

    const navigateTo = (page) => {
        setCurrentPage(page);
    }

    const pages = {
        auth: <Auth onNavigate={navigateTo} />,
        register: <Register onNavigate={navigateTo} />,
        home: <Home onNavigate={navigateTo} name={currentPage} />,
        profile: <Profile onNavigate={navigateTo} name={currentPage} />
    }

    return pages[currentPage];
}
