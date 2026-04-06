import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
console.log(userInfo);
  if (!userInfo) {
    return <Navigate to="/" replace />;
  }else {
    return children;

  }
};

export default ProtectedRoute;