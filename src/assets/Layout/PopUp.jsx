import { useState } from "react";
import { UserInfo } from "../Components/UserInfo";
import { useContext} from "react";
import { MyContext } from "../../Context";

export function PopUp() {

  const { lightMode } = useContext(MyContext);

  const [visible, setVisible] = useState(false);

  function toggleVisible() {
    setVisible(newVisible => !newVisible)
  }

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("userData");
    window.location.reload(); 
  };

  return (
    
    <div id={lightMode ? "pop-up-menu-dark" : "pop-up-menu-light"}>
      { visible ? <UserInfo/> : null }
      <p
      onClick={toggleVisible}
      >My Profile</p>
      <p 
      onClick={handleLogout}>Logout</p>
    </div>
  );
}