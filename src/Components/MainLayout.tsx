import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeContext from "../Contexts/MainContext/context";
import Home from "../Screens/Home";
import Signup from "../Screens/Signup";
import useHome from "../hooks/useHome";
import Header from "./Header";

const AllComponents = () => {
    const { } = useContext(HomeContext);

    return (
        <div className="bg-neutral-900 max-sm:px-2 max-w-screen overflow-hidden pb-4 min-h-screen ">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={< Home />} />
                    <Route path="/signup" element={< Signup />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
};

const MainLayout = () => {
    const value = useHome();
    return (
        <HomeContext.Provider value={value} >
            <AllComponents />
        </HomeContext.Provider>
    );
};

export default MainLayout;
