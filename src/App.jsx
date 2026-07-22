import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from './components/DashboardLayout'
import Layout from './components/Layout'
import BuyOrderPage from './pages/BuyOrderPage'
import ComingSoonPage from './pages/ComingSoonPage'
import DashboardOverviewPage from './pages/DashboardOverviewPage'
import LoginPage from './pages/LoginPage'
import OrderLookupPage from './pages/OrderLookupPage'
import SignupPage from './pages/SignupPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverviewPage />} />
          <Route path="buy" element={<BuyOrderPage />} />
          <Route path="orders" element={<OrderLookupPage />} />
          <Route path="portfolio" element={<ComingSoonPage title="Portfolio" />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  )
}
