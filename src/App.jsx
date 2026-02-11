import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { PortfolioProvider } from "./context/PortfolioContext";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import BuilderPage from "./pages/BuilderPage";
import TemplatesPage from "./pages/TemplatesPage";
import PreviewPage from "./pages/PreviewPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <PortfolioProvider>
      <Router>
        <div className="min-h-screen relative noise-overlay">
          <div className="fixed inset-0 bg-radial-navy pointer-events-none z-0" />
          <div className="fixed inset-0 bg-radial-accent pointer-events-none z-0" />
          <div className="fixed top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] bg-blue-900/20 pointer-events-none z-0" />
          <div className="fixed bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] bg-indigo-900/15 pointer-events-none z-0" />
          <div className="relative z-10">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/builder" element={<BuilderPage />} />
              <Route path="/templates" element={<TemplatesPage />} />
              <Route path="/preview" element={<PreviewPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </PortfolioProvider>
  );
};

export default App;