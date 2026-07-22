import { useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { placeBuyOrder } from '../api/client'
import ErrorAlert from '../components/ErrorAlert'
import FormField from '../components/FormField'
import GttSection from '../components/GttSection'

const INITIAL_FORM = { symbol: '', qty: '', orderType: 'MARKET', price: '' }

export default function BuyOrderPage() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [successOrderId, setSuccessOrderId] = useState(null)

  const isLimit = form.orderType === 'LIMIT'

  const updateField = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    setSuccessOrderId(null)
    setSubmitting(true)

    placeBuyOrder(form.symbol, Number(form.qty), form.orderType, isLimit ? Number(form.price) : null)
      .then((response) => {
        setSuccessOrderId(response.orderId)
        setForm(INITIAL_FORM)
      })
      .catch((err) => setError(err.message))
      .finally(() => setSubmitting(false))
  }

  return (
    <Card style={{ maxWidth: 480 }}>
      <Card.Body>
        <Card.Title className="mb-3">Buy Stock</Card.Title>
        <ErrorAlert message={error} />
        {successOrderId && (
          <>
            <Alert variant="success">Order placed — ID {successOrderId}</Alert>
            <GttSection key={successOrderId} orderId={successOrderId} />
          </>
        )}
        <form onSubmit={handleSubmit}>
          <FormField
            label="Symbol"
            type="text"
            value={form.symbol}
            onChange={(e) => setForm((f) => ({ ...f, symbol: e.target.value.toUpperCase() }))}
          />
          <FormField label="Quantity" type="number" min="1" value={form.qty} onChange={updateField('qty')} />
          <Form.Group className="mb-3">
            <Form.Label>Order Type</Form.Label>
            <Form.Select value={form.orderType} onChange={updateField('orderType')}>
              <option value="MARKET">Market</option>
              <option value="LIMIT">Limit</option>
            </Form.Select>
          </Form.Group>
          {isLimit && (
            <FormField label="Price" type="number" min="0" step="0.05" value={form.price} onChange={updateField('price')} />
          )}
          <Button type="submit" variant="primary" className="w-100" disabled={submitting}>
            {submitting ? 'Placing order…' : 'Place Order'}
          </Button>
        </form>
      </Card.Body>
    </Card>
  )
}
