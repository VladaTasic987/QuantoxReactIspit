import { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

export function MyContextProvider({ children }) {
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem("userData");
    return saved ? JSON.parse(saved) : [];
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("Token");
  });

  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [lightMode, setLightMode] = useState(() => {
    const saved = localStorage.getItem("lightMode");
    return saved !== null ? JSON.parse(saved) : true; 
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function toggleLightMode() {
    setLightMode(prev => !prev);
  }

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("userData");
    window.location.reload(); 
  };

  
  useEffect(() => {
    if (token) {
      localStorage.setItem("Token", token);
    } else {
      localStorage.removeItem("Token");
    }
  }, [token]);

  
  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      localStorage.removeItem("userData");
    }
  }, [userData]);

  
  useEffect(() => {
    localStorage.setItem("lightMode", JSON.stringify(lightMode));
  }, [lightMode]);

  return (
    <MyContext.Provider
      value={{
        userData,
        setUserData,
        page,
        setPage,
        search,
        setSearch,
        debouncedSearch,
        setDebouncedSearch,
        selectedProduct,
        setSelectedProduct,
        token,
        setToken,
        lightMode,
        toggleLightMode,
        isMobile,
        handleLogout,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}