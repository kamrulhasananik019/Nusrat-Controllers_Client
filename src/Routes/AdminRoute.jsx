import { Navigate, useLocation } from "react-router-dom";
import useRole from "../Components/Hook/useRole";


const AdminRoute = ({ children }) => {
    const [isAdmin, isAdminLoading, error] = useRole(); // Use the updated hook
    const location = useLocation();

    if (isAdminLoading) {
        return <progress className="progress w-56"></progress>;
    }

    if (error) {
        return <div>Error loading role status. Please try again later.</div>;
    }

    if (isAdmin) { // Allow access if user is admin or moderator
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
