import React from 'react'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Session = () => {

  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const { logIn, signUp } = useAuth()


  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignUp) { signUp(email, password) }
    else {
      logIn(email, password)
    }

    navigate("/consultas")

  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
  }
  return (
    <div>

      <h2> Session </h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label> Usuario email:</label><br />
          <input
            type="email"
            placeholder='usuario@ferreteria.com.ar'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>

          <label> Password:</label><br />
          <input
            type="password"
            placeholder='********************'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">{isSignUp ? "SignUp" : "LogIn"}</button>
        <pre onClick={toggleMode}> {isSignUp ? "Iniciar Session" : "Registrarse"}</pre>

      </form>

    </div>
  )
}

export default Session