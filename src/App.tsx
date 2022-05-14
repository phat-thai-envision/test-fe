import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./normalize.module.scss";
import "./App.module.scss";
import { useDemoStore } from "zustand-store/demo";
import AvailabilityPage from "pages/availability";
import HomePage from "pages/home";

const App = () => {
  const { fetchData } = useDemoStore();
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
