export const API_BASE = import.meta.env.VITE_API_BASE_URL

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: 'include',
    headers: options.body
      ? { 'Content-Type': 'application/json', ...options.headers }
      : options.headers,
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    let message = body || res.statusText
    try {
      const parsed = JSON.parse(body)
      message = parsed.message || parsed.error || message
    } catch {
      // Not a JSON error body — fall back to the raw text/status above.
    }
    throw new Error(message)
  }

  const text = await res.text()
  return text ? JSON.parse(text) : null
}

export const signup = (userId, password) =>
  apiFetch('/auth/signup', { method: 'POST', body: JSON.stringify({ userId, password }) })

export const login = (userId, password) =>
  apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ userId, password }) })

export const logout = () => apiFetch('/auth/logout', { method: 'POST' })

export const getSessionStatus = () => apiFetch('/auth/session')

export const placeBuyOrder = (symbol, qty, orderType, price) =>
  apiFetch('/orders/buy', { method: 'POST', body: JSON.stringify({ symbol, qty, orderType, price }) })

export const getOrderStatus = (orderId) => apiFetch(`/orders/${orderId}`)

export const previewGtt = (orderId, targetPct, slPct) =>
  apiFetch(`/orders/${orderId}/gtt-preview?${new URLSearchParams({ targetPct, slPct })}`)

export const placeGtt = (orderId, targetPct, slPct) =>
  apiFetch(`/orders/${orderId}/gtt`, { method: 'POST', body: JSON.stringify({ targetPct, slPct }) })
