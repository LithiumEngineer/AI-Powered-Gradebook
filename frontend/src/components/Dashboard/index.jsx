import { useState } from "react"
import Sidebar from "../Sidebar"
import Students from "./Students"
import Tests from "./Tests"
import { useAuth0 } from "@auth0/auth0-react"

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Overview")
  const {user} = useAuth0()
  if(user) console.log("Current User: ", user)
  return (
    <div className="flex w-screen h-screen">
      <Sidebar
        selected={selectedTab}
        changeSelected={(selected) => setSelectedTab(selected)}
      />
      <div className="flex-1">
        {selectedTab === "Students" && <Students />}
        {selectedTab === "Tests" && <Tests />}
      </div>
    </div>
  )
}
export default Dashboard
