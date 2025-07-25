import { useContext } from "react";
import HomeContext from "../Contexts/MainContext/context";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }: { user: any }) => {
    const { set_user } = useContext(HomeContext);
    const navigate = useNavigate();
    if (!user) {
        return (
            <div className="w-96 p-6 bg-gray-800 rounded-3xl shadow-xl border border-gray-700 text-center">
                <p className="text-gray-200 text-lg font-medium">No user data available</p>
            </div>
        );
    }


    const logout = () => {
        set_user(null);
        navigate('/signup');
    }
    const initials = user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase();

    return (
        <div className="w-full max-w-md p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl transform transition-all duration-300">
            <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-6">
                    {initials}
                </div>
                <h2 className="text-3xl font-bold text-white mb-1">{user.name}</h2>
                <p className="text-sm text-blue-400 mb-6">Active User</p>
            </div>

            <div className="space-y-4 text-gray-200">
                <div className="flex items-center justify-between border-b border-gray-700 pb-3">
                    <span className="text-sm font-semibold text-gray-400">Email</span>
                    <span className="text-base">{user.email}</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-700 pb-3">
                    <span className="text-sm font-semibold text-gray-400">Address</span>
                    <span className="text-base text-right">{user.address}</span>
                </div>
            </div>

            <div className="mt-6 flex gap-3 justify-center">
                <button className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all font-medium shadow hover:shadow-blue-500/40">
                    View Profile
                </button>
                <button onClick={logout} className="px-5 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition-all font-medium">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserCard;
