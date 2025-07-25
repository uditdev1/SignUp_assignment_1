export interface User {
    name: string;
    email: string;
    address: string;
    password: string;
}

export const users: User[] = [
    {
        name: "Udit Dev",
        email: "udit@example.com",
        address: "Gaziabad, India",
        password: "udit@123",
    },
    {
        name: "Ananya Sharma",
        email: "ananya.sharma@example.com",
        address: "45 Rose Avenue, Mumbai, India",
        password: "secure5678",
    },
    {
        name: "Ravi Kumar",
        email: "ravi.kumar@example.com",
        address: "78 Blue Road, Bangalore, India",
        password: "myPass@90",
    },
    {
        name: "Priya Mehta",
        email: "priya.mehta@example.com",
        address: "12 Sunset Colony, Pune, India",
        password: "qwerty123",
    },
    {
        name: "Aman Verma",
        email: "aman.verma@example.com",
        address: "9 Orchid Street, Jaipur, India",
        password: "aman#456",
    },
];