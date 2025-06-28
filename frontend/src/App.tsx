import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ReadingListPage } from "./pages/ReadingListPage";
import { SettingsPage } from "./pages/SettingsPage";
import { TermsOfUsePage } from "./pages/TermsOfUsePage"; // Importamos a nova página
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage"; // Importamos a nova página
import { MainLayout } from "./components/MainLayout"; // Importamos o novo Layout

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas que usam o MainLayout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout>
                <HomePage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-list"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ReadingListPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <MainLayout>
                <SettingsPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Rotas públicas que NÃO usam o MainLayout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Nossas novas rotas de conteúdo estático. Elas não precisam ser protegidas. */}
        <Route path="/terms-of-use" element={<TermsOfUsePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
