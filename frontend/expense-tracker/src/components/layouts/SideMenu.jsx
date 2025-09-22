import React, { useContext} from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const SideMenu = ({ activeMenu }) => {
    const { user, clearUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route === "/logout") {
            handleLogout();
            return;
    }
        navigate(route);
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    };
    return <div className="">
        <div className="">
            {user ?.profileImageUrl  ? (
            <img 
            src={user?.profileImageUrl || ""}
        </div>

    </div>;
};

export default SideMenu;