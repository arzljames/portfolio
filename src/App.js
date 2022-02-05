import "./App.css";
import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <AnimatePresence>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AnimatePresence>
    </>
  );
}

export default App;
