import { useState } from "react"
import { UserInfo } from "../Components/UserInfo"
import { useContext} from "react";
import { MyContext } from "../../Context";

export function MobilePopUp () {

    const {toggleLightMode, handleLogout, token} = useContext(MyContext);

    const [userVisible, setUserVisible] = useState(false);

    function ToggleUserVisible () {
        setUserVisible(newVisible => !newVisible)
    }

    return (

        <div className="mobile-container">
        
        {token ? <div
        className="profile"
        onClick={ToggleUserVisible}
        >🤺My Profile</div> : null}

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