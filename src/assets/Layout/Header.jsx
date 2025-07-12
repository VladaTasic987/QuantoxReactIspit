import { useContext, useState } from "react";
import { MyContext } from "../../Context";
import logo from "../Images/vite.svg";
import { PopUp } from "./PopUp";
import { MobilePopUp } from "./MobilePopUp";

export function Header() {

    const { userData, toggleLightMode, lightMode, isMobile, token } = useContext(MyContext);

    const[visible, setVisible] = useState(false);

    const[toggleImage, setToggleImage] = useState(false);

    const[mobile, setMobile] = useState(false);

    function toggleVisible () {
        setVisible(newVisible => !newVisible)
    }
    
    function toggle () {
        setToggleImage(newToggle => !newToggle)
    }

    function toggleMobile () {
        setMobile(newMobile => !newMobile)
    }

    return (

        

        <div id={lightMode ? "header-container-light" : "header-container-dark"}>

            {visible ? <PopUp/> : null}
            

            <div className="logo">
                <img 
                src={logo} 
                alt="logo"
                className="logo-img"
                />
            </div> 

            {mobile ? <MobilePopUp/> : null}

            {! isMobile ? <div 
            className="right-content"
            
            >
            <div 
            className="theme"
            onClick={toggleLightMode}
            >
                { toggleImage ? 
                <p 
                className="dark"
                onClick={toggle}
                >🌃</p> :                 <p 
                className="light"
                onClick={toggle}
                >🌁</p>}
                
            </div> 

           { token ? <div 
           className="user-info"
           onClick={toggleVisible}
           >
            {userData ? (
            <>
            {userData.image && (
            <img
                src={userData.image}
                alt={`${userData.firstName}'s thumbnail`}
                className="user-image"
            /> 
            )}
            <p
            className="user-name"
            >{userData.firstName}</p>
            </>
            ) : (
            <p>No user data</p>
            )}
                </div> : null}
            </div> : 
            <div
            className="mobile-right"
            onClick={toggleMobile}
            >📱</div>}
        </div> 

    )

}