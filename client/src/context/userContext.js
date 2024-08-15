import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext();

const UserProvider = ({ children }) => {
    const [state, setState] = useState({
        user: null,
        loading: true,
    });

    /*useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8082/api/v1/auth/session_data`);
                setState({ user: data.user, loading: false });
            } catch (error) {
                console.log("Error getting session data", error);
                setState({ user: null, loading: false });
            }
        };

        fetchSessionData();
    }, []);*/

    return (
        <userContext.Provider value={[state, setState]}>
            {children}
        </userContext.Provider>
    );
};

const useAuth = () => useContext(userContext);

export { useAuth, UserProvider };
