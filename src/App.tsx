import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import LayoutPage from "./components/layout";
import AboutPage from "./pages/about";

function App() {
  return (
    <Routes>
      <Route element={<LayoutPage />}>
        <Route path="/" index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}

export default App;
