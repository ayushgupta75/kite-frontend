import { Container, Nav, Navbar as BsNavbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { API_BASE, logout } from '../api/client'
import { useSession } from '../context/SessionContext'

export default function Navbar() {
  const { loggedIn, userId, kiteConnected, refresh } = useSession()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
      .then(refresh)
      .then(() => navigate('/login'))
  }

  return (
    <BsNavbar bg="dark" variant="dark" expand="sm">
      <Container>
        <BsNavbar.Brand as={Link} to="/dashboard">
          Kite
        </BsNavbar.Brand>
        <Nav className="ms-auto align-items-center gap-2">
          {loggedIn ? (
            <>
              {/* Real browser navigation, not a fetch through api/client.js — this
                  has to follow Kite's actual login page and redirect chain. */}
              <Nav.Link as="a" href={`${API_BASE}/login`} className="btn btn-outline-light btn-sm">
                {kiteConnected ? 'Reconnect Zerodha' : 'Connect to Zerodha'}
              </Nav.Link>
              <Nav.Item className="text-light">{userId}</Nav.Item>
              <Nav.Link as="button" className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Signup
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </BsNavbar>
  )
}
