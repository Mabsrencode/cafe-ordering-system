import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Layout from "./Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Menu from "./pages/Menu/Menu";
import Logs from "./pages/Logs/Logs";
import NoPage from "./pages/NoPage/NoPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
