import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function Logout(){
    const { logout } = useAuth();

    const handleLogout = async () => {
      try {
        await logout();
      } catch (error) {
        console.error(error.message);
      }
    };

    return(
        <Link  className="nav-link " onClick={handleLogout}>
        Logout
      </Link>
    )
}