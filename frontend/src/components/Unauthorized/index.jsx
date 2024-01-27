import MenuBar from "../MenuBar"
import { useAuth0 } from "@auth0/auth0-react"

const Unauthorized = () => {
  const { loginWithRedirect } = useAuth0()
  return (
    <div className="flex flex-col w-screen h-screen bg-[#FFFDE8]">
      <MenuBar />
      <div className="w-fit h-fit mx-auto my-auto">
        <div className="text-4xl">Oh sheep! You are not logged in.</div>
        <div
          className="rounded-sm px-12 py-3 bg-[#F09C67] w-fit h-fit mx-auto mt-5 text-white hover:cursor-pointer hover:bg-[#f08e50]"
          onClick={() => loginWithRedirect()}
        >
          Log in
        </div>
      </div>
    </div>
  )
}

export default Unauthorized
