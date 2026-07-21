import { Container } from 'react-bootstrap'
import KiteConnectionStatus from '../components/KiteConnectionStatus'
import { useSession } from '../context/SessionContext'

export default function DashboardOverviewPage() {
  const { kiteConnected, kiteExpiresAt } = useSession()

  return (
    <Container style={{ maxWidth: 480 }} className="p-0">
      <KiteConnectionStatus kiteConnected={kiteConnected} kiteExpiresAt={kiteExpiresAt} />
    </Container>
  )
}
