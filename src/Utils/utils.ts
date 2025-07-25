import { users } from "./UserDetails";

export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const verifyUser = (formData: any): any => {
    return users.find(
        (user) => user.email === formData.email && user.password === formData.password
    );
};