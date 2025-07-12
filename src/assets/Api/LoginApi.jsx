import { useContext } from "react";
import { MyContext } from "../../Context";
import axios from "axios";

export function useLogin() {
  const { setUserData, setToken } = useContext(MyContext);

  const login = async (credentials) => {
    try {
      const { data } = await axios.post("https://dummyjson.com/auth/login", {
        username: credentials.username,
        password: credentials.password,
        expiresInMins: 30,
      });
      localStorage.setItem("Token", data.accessToken);
      setUserData(data);
      setToken(data.accessToken);
      return data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          `Login failed: ${error.response.status} ${error.response.data.message || error.response.statusText}`
        );
      } else {
        throw new Error(`Login failed: ${error.message}`);
      }
    }
  };

  return login;
}