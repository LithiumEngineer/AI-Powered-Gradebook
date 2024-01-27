import MenuBar from "../MenuBar"
import { useAuth0 } from "@auth0/auth0-react"

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  return (
    <div>
      <MenuBar />
      
    </div>
  )
}

export default Home
