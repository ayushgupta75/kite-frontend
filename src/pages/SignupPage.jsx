import { useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../api/client'
import ErrorAlert from '../components/ErrorAlert'
import FormField from '../components/FormField'

export default function SignupPage() {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    signup(userId, password)
      .then(() => navigate('/login'))
      .catch((err) => setError(err.message))
  }

  return (
    <Container className="py-4" style={{ maxWidth: 480 }}>
      <Card>
        <Card.Body>
          <Card.Title className="mb-3">Sign up</Card.Title>
          <ErrorAlert message={error} />
          <form onSubmit={handleSubmit}>
            <FormField
              label="User ID"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value.toLowerCase())}
            />
            <FormField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button type="submit" variant="primary" className="w-100">
              Sign up
            </Button>
          </form>
          <p className="mt-3 mb-0 text-center">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  )
}
