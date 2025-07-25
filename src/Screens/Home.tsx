import { useContext, useEffect } from "react";
import HomeContext from "../Contexts/MainContext/context";
import UserCard from "../Components/UserCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { user } = useContext(HomeContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/signup");
        }
    }, [user, navigate]);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col items-center justify-start py-16 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                    👋 Welcome back, <span className="text-blue-400">{user.name.split(" ")[0]}</span>!
                </h1>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                    Here’s your profile information. Feel free to explore and update your details anytime.
                </p>
            </div>
            <UserCard user={user} />
            <div className="mt-12 flex gap-4">
                <button
                    onClick={() => navigate("/edit")}
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all font-medium shadow-md hover:shadow-blue-500/50"
                >
                    ✏️ Edit Profile
                </button>
                <button
                    onClick={() => navigate("/settings")}
                    className="px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 transition-all font-medium shadow-md"
                >
                    ⚙️ Settings
                </button>
            </div>
        </div>
    );
};

export default Home;
