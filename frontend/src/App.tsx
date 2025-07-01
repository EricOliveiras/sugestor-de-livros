import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ReadingListPage } from "./pages/ReadingListPage";
import { SettingsPage } from "./pages/SettingsPage";
import { TermsOfUsePage } from "./pages/TermsOfUsePage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { ChangelogPage } from "./pages/ChangelogPage";
import { AboutPage } from "./pages/AboutPage"; 
import { MainLayout } from "./components/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Agrupamos todas as rotas que usam o mesmo Layout */}
        <Route
          element={
            <MainLayout>
              <Outlet />
            </MainLayout>
          }
        >
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-list"
            element={
              <ProtectedRoute>
                <ReadingListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />

          {/* Rotas públicas com layout */}
          <Route path="/terms-of-use" element={<TermsOfUsePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          {/* ADICIONAMOS A NOVA ROTA AQUI */}
          <Route path="/about" element={<AboutPage />} />
        </Route>

        {/* Rotas de Login/Cadastro que têm layout próprio */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
