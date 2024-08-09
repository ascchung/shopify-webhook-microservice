import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "@shopify/polaris";
import HomePage from "./pages/HomePage";
import "@shopify/polaris/build/esm/styles.css";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
