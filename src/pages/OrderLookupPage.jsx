import { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { getOrderStatus } from '../api/client'
import ErrorAlert from '../components/ErrorAlert'
import FormField from '../components/FormField'
import GttSection from '../components/GttSection'

export default function OrderLookupPage() {
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    setOrder(null)
    setLoading(true)

    getOrderStatus(orderId)
      .then((response) => setOrder(response))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  return (
    <Card style={{ maxWidth: 480 }}>
      <Card.Body>
        <Card.Title className="mb-3">Orders</Card.Title>
        <ErrorAlert message={error} />
        <form onSubmit={handleSubmit}>
          <FormField label="Order ID" type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
          <Button type="submit" variant="primary" className="w-100" disabled={loading}>
            {loading ? 'Looking up…' : 'Look Up'}
          </Button>
        </form>

        {order && (
          <div className="mt-3 pt-3 border-top">
            <div>Symbol: {order.symbol}</div>
            <div>Quantity: {order.qty}</div>
            <div>Status: {order.status}</div>
            {order.averagePrice != null && <div>Average price: {order.averagePrice}</div>}

            {order.status === 'COMPLETE' && <GttSection orderId={order.orderId} />}
          </div>
        )}
      </Card.Body>
    </Card>
  )
}
