import { useAuth } from "../../context/userContext";
import { Route, Navigate, Outlet } from 'react-router-dom';


const OwnerRoute = () => {
    const [{ user, loading }] = useAuth();

    if (loading) return <div>Loading...</div>;

    return user && user.role === 'manager' ? <Outlet /> : <Navigate to="/login" />;
};

export default OwnerRoute;
