import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import { HomePageLogin } from './assets/Containers/HomePageLogin';
import { HomePageProducts } from "./assets/Containers/HomePageProducts";
import './App.scss';
import { useContext } from "react";
import { MyContext } from "./Context";

function App() {
  
  const { token } = useContext(MyContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            token ? <HomePageProducts /> : <HomePageLogin />
          }
        />
        <Route path="/" element={<HomePageProducts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

