import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }: any) => {

  const role = localStorage.getItem("role");

  if (role !== "admin") {
    return <Navigate to="/student" />;
  }

  return children;
};

export default AdminRoute;
