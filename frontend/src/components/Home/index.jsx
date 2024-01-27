import MenuBar from "../MenuBar"
import { useAuth0 } from "@auth0/auth0-react"

const Home = () => {
  const { loginWithRedirect } = useAuth0()
  const { user, isAuthenticated, isLoading } = useAuth0()

  return (
    <div className="flex flex-col w-screen h-screen bg-[#FFFDE8]">
      <MenuBar />
      <div className="flex mt-20">
        <div className="w-60 h-60 bg-[#D9D9D9] rounded-full ml-10">
          <img src="avatar.png" className="p-3"></img>
        </div>
        <div className="text-[#4C8492] flex-1 mx-10">
          <div className="font-bold italic text-lg">Tired of worksheets?</div>
          <div className="text-2xl italic font-bold">Introducing</div>
          <div className="font-bold text-5xl">WorkSheeps</div>
          <div className="font-bold italic text-lg mt-2">
            Every student shines in their own way, so why only use
            one-size-fits-all worksheets?{" "}
          </div>
          <div className="mt-2">
            <div className="inline font-bold">Say hello to WorkSheeps!</div>
            <div className="inline">
              {" "}
              Leveraging the power of AI, WorkSheeps meticulously analyses each
              individual student's strengths and weaknesses and generates unique
              worksheets for every student. The result? Personalized worksheets
              that are as unique as each student, supercharging their learning
              journey with just the click of a button!
            </div>
          </div>
          <div
            className="rounded-sm px-12 py-3 bg-[#F09C67] w-fit h-fit mx-auto mt-5 text-white hover:cursor-pointer hover:bg-[#f08e50]"
            onClick={() => loginWithRedirect()}
          >
            Get Started!
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
