import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import api from "../../src/api";
const userContext = createContext();

const UserProvider = ({ children }) => {
    const [state, setState] = useState({
        user: null,
        loading: true,
        baal: null,
    });

    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                console.log("Fetching session data...");
                const { data } = await api.get(`http://localhost:3001/api/v1/auth/session_data`, {
                    withCredentials: true // Ensure credentials are sent with the request
                });
                console.log("Session data received:", data);
                setState({ user: data.user, loading: false });
            } catch (error) {
                console.log("Error getting session data:", error);
                setState({ user: null, loading: true });
            }
        };

        fetchSessionData();
    }, []);


    return (
        <userContext.Provider value={[state, setState]}>
            {children}
        </userContext.Provider>
    );
};

const useAuth = () => useContext(userContext);

export { useAuth, UserProvider };
