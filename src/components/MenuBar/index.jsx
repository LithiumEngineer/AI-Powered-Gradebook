import { useAuth0 } from "@auth0/auth0-react"
import LogoutButton from "../UserAuthentication/LogoutButton"
import {HiOutlineUserCircle} from "react-icons/hi2"

const MenuBar = () => {
  const { loginWithRedirect } = useAuth0()
  const { user, isAuthenticated, isLoading } = useAuth0()
  return (
    <div className="flex justify-between items-center w-screen h-[50px] bg-[#FFF8B4] ">
      <div className="ml-5">WorkSheeps</div>

      {isAuthenticated ? (
        <LogoutButton />
      ) : (
        <div
          className="flex items-center py-1 px-2 border-[1px] border-solid border-black rounded-md hover:cursor-pointer mr-2"
          onClick={() => loginWithRedirect()}
        >
          <HiOutlineUserCircle className="w-5 h-5 mr-2"/>
          Log In
        </div>
      )}
    </div>
  )
}

export default MenuBar
