import { useContext, useState } from "react";
import { verifyUser } from "../Utils/utils";
import HomeContext from "../Contexts/MainContext/context";
import { useNavigate } from "react-router-dom";

const FormIcon = ({ children }: { children: any }) => (
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        {children}
    </div>
);

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-400 hover:text-white" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
    </svg>
);

const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-400 hover:text-white" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.742L2.303 6.546A10.048 10.048 0 01.458 10c1.274 4.057 5.022 7 9.542 7 1.126 0 2.207-.245 3.232-.697z" />
    </svg>
);


const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { set_user } = useContext(HomeContext);

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        form: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: '',
            form: ''
        });
    };

    const validateForm = () => {
        let newErrors: any = {};
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = "Name is required.";
            isValid = false;
        }
        if (!formData.email) {
            newErrors.email = "Email is required.";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid.";
            isValid = false;
        }
        if (!formData.password) {
            newErrors.password = "Password is required.";
            isValid = false;
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters.";
            isValid = false;
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setErrors({ ...errors, form: '' });

        try {
            const response: any = verifyUser(formData);
            if (!response) {
                throw new Error("Invalid credentials");
            }
            console.log(formData);
            set_user(response);
            navigate("/")
        } catch (error: any) {
            console.error("Verification failed:", error.message);
            setErrors({ ...errors, form: <span className="text-red-400">{error.message}</span> });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="flex justify-center items-center bg-neutral-900 min-h-screen w-screen font-sans">
                <div className="w-full max-w-md p-8 space-y-6 bg-neutral-800 rounded-2xl shadow-lg border border-neutral-700">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-white">Create Account</h1>
                        <p className="text-neutral-400 mt-2">Join us and start your journey!</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                        <div className="relative">
                            <FormIcon>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </FormIcon>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className={`w-full pl-10 pr-4 py-3 bg-neutral-700 text-white border ${errors.name ? "border-red-500" : "border-neutral-600"
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
                        </div>

                        <div className="relative">
                            <FormIcon>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </FormIcon>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                className={`w-full pl-10 pr-4 py-3 bg-neutral-700 text-white border ${errors.email ? "border-red-500" : "border-neutral-600"
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
                        </div>

                        <div className="relative">
                            <FormIcon>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </FormIcon>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className={`w-full pl-10 pr-10 py-3 bg-neutral-700 text-white border ${errors.password ? "border-red-500" : "border-neutral-600"
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                            >
                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                            {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
                        </div>

                        <div className="relative">
                            <FormIcon>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </FormIcon>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm Password"
                                className={`w-full pl-10 pr-10 py-3 bg-neutral-700 text-white border ${errors.confirmPassword ? "border-red-500" : "border-neutral-600"
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                            >
                                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword}</p>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full cursor-pointer flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition duration-200"
                            >
                                {isLoading ? (
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                ) : (
                                    "Sign Up"
                                )}
                            </button>
                        </div>
                        {errors.form && <p className="text-center text-sm mt-2">{errors.form}</p>}
                    </form>

                    <div className="text-center text-sm text-neutral-400">
                        <p>
                            Already have an account?{" "}
                            <a href="#" className="font-medium text-blue-500 hover:text-blue-400">
                                Log In
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8 mx-auto w-full max-w-md p-6 bg-neutral-800 rounded-2xl shadow-lg border border-neutral-700">
                <h2 className="text-xl font-semibold text-white mb-4">Guest Credentials</h2>
                <div className="space-y-3 text-sm text-neutral-300">
                    <div className="flex justify-between">
                        <span className="font-medium">Name:</span>
                        <span>Udit Dev</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">Email:</span>
                        <span>udit@example.com</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">Address:</span>
                        <span>Gaziabad, India</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">Password:</span>
                        <span>udit@123</span>
                    </div>
                </div>
            </div>
        </>
    );

};

export default Signup;
