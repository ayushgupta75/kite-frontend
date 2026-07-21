import { Container, Spinner } from 'react-bootstrap'
import { Navigate, Outlet } from 'react-router-dom'
import { useSession } from '../context/SessionContext'
import KiteConnectionStatus from './KiteConnectionStatus'
import Sidebar from './Sidebar'

export default function DashboardLayout() {
  const { loading, loggedIn, kiteConnected } = useSession()

  if (loading) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" />
      </div>
    )
  }

  if (!loggedIn) {
    return <Navigate to="/login" replace />
  }

  if (!kiteConnected) {
    return (
      <Container className="py-4" style={{ maxWidth: 480 }}>
        <KiteConnectionStatus kiteConnected={false} />
      </Container>
    )
  }

  return (
    <div className="d-flex flex-column flex-md-row">
      <Sidebar />
      <main className="flex-grow-1 p-4">
        <Outlet />
      </main>
    </div>
  )
}
