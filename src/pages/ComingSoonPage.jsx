import { Card } from 'react-bootstrap'

export default function ComingSoonPage({ title }) {
  return (
    <Card style={{ maxWidth: 480 }}>
      <Card.Body className="text-center">
        <Card.Title>{title}</Card.Title>
        <Card.Text className="text-muted">Coming soon.</Card.Text>
      </Card.Body>
    </Card>
  )
}
