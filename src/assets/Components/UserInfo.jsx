import { useContext } from "react";
import { MyContext } from "../../Context";

export function UserInfo() {
  const { userData, lightMode } = useContext(MyContext);

  if (!userData) {
    return <div>No user data available</div>;
  }

  return (
    <div id={lightMode ? "user-info-container-light" : "user-info-container-dark"}>
      <p><strong>Username:</strong> {userData.username}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>First Name:</strong> {userData.firstName}</p>
      <p><strong>Last Name:</strong> {userData.lastName}</p>
      <img src={userData.image} alt={`${userData.firstName} ${userData.lastName}`} />
      {/* Add more fields as needed */}
    </div>
  );
}