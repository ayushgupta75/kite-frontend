import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Overview', end: true },
  { to: '/dashboard/buy', label: 'Buy Stock' },
  { to: '/dashboard/orders', label: 'Orders' },
  { to: '/dashboard/portfolio', label: 'Portfolio' },
]

function NavItems({ className }) {
  return (
    <Nav variant="pills" className={className}>
      {NAV_ITEMS.map(({ to, label, end }) => (
        <Nav.Link key={to} as={NavLink} to={to} end={end} className="text-nowrap">
          {label}
        </Nav.Link>
      ))}
    </Nav>
  )
}

export default function Sidebar() {
  return (
    <nav aria-label="Dashboard">
      {/* md+ viewports: fixed-width vertical sidebar */}
      <div className="d-none d-md-block p-3" style={{ width: 220 }}>
        <NavItems className="flex-column gap-1" />
      </div>
      {/* below md: horizontal pill nav above the content instead of a column */}
      <div className="d-md-none border-bottom bg-light p-2">
        <NavItems className="flex-row gap-1" />
      </div>
    </nav>
  )
}
