import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";
import HomePage from "@/pages/HomePage";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import CourseLandingPage from "@/pages/CourseLandingPage";
import AgenticAICoursePage from "@/pages/AgenticAICoursePage";
import "@/App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" richColors theme="light" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses/generative-ai" element={<CourseLandingPage />} />
          <Route path="/courses/agentic-ai" element={<AgenticAICoursePage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
