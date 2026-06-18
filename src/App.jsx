import { Navigate, Route, Routes } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import DashboardLayout from './components/DashboardLayout'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import HierarchyPage from './pages/HierarchyPage'
import AboutPage from './pages/AboutPage'
import ResultsPage from './pages/ResultsPage'
import FaqPage from './pages/FaqPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import PortalHomePage from './pages/PortalHomePage'
import PortalUsersPage from './pages/PortalUsersPage'
import PortalUserCreatePage from './pages/PortalUserCreatePage'
import PortalRatesPage from './pages/PortalRatesPage'
import PortalSupportPage from './pages/PortalSupportPage'
import PortalSettingsPage from './pages/PortalSettingsPage'
import PortalPasswordPage from './pages/PortalPasswordPage'

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/hierarchy" element={<HierarchyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/portal"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<PortalHomePage />} />
        <Route path="users" element={<PortalUsersPage />} />
        <Route path="users/create" element={<PortalUserCreatePage />} />
        <Route path="rates" element={<PortalRatesPage />} />
        <Route path="support" element={<PortalSupportPage />} />
        <Route path="settings" element={<PortalSettingsPage />} />
        <Route path="password" element={<PortalPasswordPage />} />
      </Route>

      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
