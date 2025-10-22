import { NavLink, useNavigate } from "react-router"
import { useSessionStore } from "../store/sessionStore"

const Home = () => {
  const { user } = useSessionStore()

  return (
    <div>
      <p>
        Home bienvenido: {user?.email ? user.email : "new user"}
      </p>

      <NavLink to="/session" > LogIn </NavLink>
    </div>
  )
}

export default Home