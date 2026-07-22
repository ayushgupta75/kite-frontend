import { useEffect, useState } from 'react'
import { Alert, Button, Spinner } from 'react-bootstrap'
import { placeGtt, previewGtt } from '../api/client'
import ErrorAlert from './ErrorAlert'
import FormField from './FormField'

const PREVIEW_DEBOUNCE_MS = 500

function parsePositiveNumber(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null
}

export default function GttSection({ orderId }) {
  const [targetPct, setTargetPct] = useState('3')
  const [slPct, setSlPct] = useState('1.5')
  const [preview, setPreview] = useState(null)
  const [previewLoading, setPreviewLoading] = useState(false)
  const [previewError, setPreviewError] = useState(null)
  const [placing, setPlacing] = useState(false)
  const [placeResult, setPlaceResult] = useState(null)
  const [placeError, setPlaceError] = useState(null)

  useEffect(() => {
    const target = parsePositiveNumber(targetPct)
    const sl = parsePositiveNumber(slPct)
    setPlaceResult(null)
    setPlaceError(null)

    if (target === null || sl === null) {
      setPreview(null)
      setPreviewError(null)
      return
    }

    setPreviewLoading(true)
    const timeout = setTimeout(() => {
      previewGtt(orderId, target, sl)
        .then((response) => {
          setPreview(response)
          setPreviewError(null)
        })
        .catch((err) => {
          setPreview(null)
          setPreviewError(err.message)
        })
        .finally(() => setPreviewLoading(false))
    }, PREVIEW_DEBOUNCE_MS)

    return () => {
      clearTimeout(timeout)
      setPreviewLoading(false)
    }
  }, [orderId, targetPct, slPct])

  const handlePlaceGtt = () => {
    setPlacing(true)
    setPlaceError(null)
    placeGtt(orderId, parsePositiveNumber(targetPct), parsePositiveNumber(slPct))
      .then((response) => setPlaceResult(response))
      .catch((err) => setPlaceError(err.message))
      .finally(() => setPlacing(false))
  }

  return (
    <div className="mt-3 pt-3 border-top">
      <h6>Set Target / Stoploss (GTT)</h6>
      <FormField label="Target %" type="number" min="0" step="0.1" value={targetPct}
                 onChange={(e) => setTargetPct(e.target.value)} />
      <FormField label="Stoploss %" type="number" min="0" step="0.1" value={slPct}
                 onChange={(e) => setSlPct(e.target.value)} />

      {previewLoading && (
        <div className="text-muted mb-3">
          <Spinner animation="border" size="sm" className="me-2" />
          Calculating…
        </div>
      )}
      {!previewLoading && previewError && <ErrorAlert message={previewError} />}
      {!previewLoading && preview && (
        <div className="mb-3 small text-muted">
          <div>Entry price: {preview.entryPrice}</div>
          <div>Live LTP: {preview.ltp}</div>
          <div>Target price: {preview.targetPrice}</div>
          <div>Stoploss price: {preview.slPrice}</div>
        </div>
      )}

      <ErrorAlert message={placeError} />
      {placeResult && <Alert variant="success">GTT placed — trigger ID {placeResult.triggerId}</Alert>}

      <Button variant="primary" className="w-100" disabled={!preview || placing} onClick={handlePlaceGtt}>
        {placing ? 'Placing GTT…' : 'Place GTT'}
      </Button>
    </div>
  )
}
