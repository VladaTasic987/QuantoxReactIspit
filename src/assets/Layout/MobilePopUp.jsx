import { useState } from "react"
import { UserInfo } from "../Components/UserInfo"
import { useContext} from "react";
import { MyContext } from "../../Context";

export function MobilePopUp () {

    const {toggleLightMode, handleLogout} = useContext(MyContext);

    const [userVisible, setUserVisible] = useState(false);

    function ToggleUserVisible () {
        setUserVisible(newVisible => !newVisible)
    }

    return (

        <div className="mobile-container">
        
        <div
        className="profile"
        onClick={ToggleUserVisible}
        >🤺My Profile</div>

        <div
        className="theme-change"
        onClick={toggleLightMode}
        >🌓Change Theme</div>

        <div
        className="logout"
        onClick={handleLogout}
        >🚷Logout</div>

        {userVisible ? <UserInfo/> : null}

        </div>

    )

}