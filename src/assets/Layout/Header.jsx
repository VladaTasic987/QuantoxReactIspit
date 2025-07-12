import { useContext, useState } from "react";
import { MyContext } from "../../Context";
import logo from "../Images/vite.svg";
import { PopUp } from "./PopUp";

export function Header() {

    const[visible, setVisible] = useState(false);

    function toggleVisible () {
        setVisible(newVisible => !newVisible)
    }

    const { userData, toggleLightMode, lightMode } = useContext(MyContext);
    
    const[toggleImage, setToggleImage] = useState(false);

    function toggle () {
        setToggleImage(newToggle => !newToggle)
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

            <div 
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
                >🌃</p> :
                <p 
                className="light"
                onClick={toggle}
                >🌁</p>}
                
            </div>

           <div 
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
                </div>
            </div>
        </div>

    )

}