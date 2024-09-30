import { useAuth } from "../../context/userContext";
import { Route, Navigate, Outlet } from 'react-router-dom';
const OwnerRoute = () => {
    const [{ user, loading }] = useAuth();
    console.log(user);
    if (loading) return <div>Loading...</div>;

    return user && user === 'owner' ? <Outlet /> : <Navigate to="/login" />;
};

export default OwnerRoute;
