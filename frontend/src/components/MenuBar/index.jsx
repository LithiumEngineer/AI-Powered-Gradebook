import { useAuth0 } from "@auth0/auth0-react"
import LogoutButton from "../UserAuthentication/LogoutButton"
import { HiOutlineUserCircle } from "react-icons/hi2"
import React from "react"

const MenuBar = () => {
  const { loginWithRedirect } = useAuth0()
  const { user, isAuthenticated, isLoading } = useAuth0()
  return (
    <div className="flex justify-between items-center w-screen h-[70px] bg-[#f08e50] ">
      <img src="WorkSheeps.png" className="max-h-full ml-5 py-1"/>

      {isAuthenticated ? (
        <LogoutButton />
      ) : (
        <div
          className="flex items-center py-1 px-4 text-white bg-[#4C8492] rounded-full hover:cursor-pointer mr-2 border-[1px] border-solid border-[#4C8492] hover:bg-white hover:text-[#4C8492] hover:underline duration-100"
          onClick={() => loginWithRedirect()}
        >
          <HiOutlineUserCircle className="w-5 h-5 mr-2" />
          Login
        </div>
      )}
    </div>
  )
}

export default MenuBar
