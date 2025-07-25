import { useEffect, useState } from "react";
export const useHome = () => {
    const [user, set_user] = useState<any>(null);
    useEffect(() => {
        console.log(user);
    }, [user]);
    return { user, set_user };
};

export default useHome;
