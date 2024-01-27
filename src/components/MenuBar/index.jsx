import LoginButton from "../UserAuthentication/LoginButton"
import { useAuth0 } from "@auth0/auth0-react"
import LogoutButton from "../UserAuthentication/LogoutButton"

const MenuBar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  return (
    <div className="">
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </div>
  )
}

export default MenuBar
