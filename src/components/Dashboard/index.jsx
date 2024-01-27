import { useState } from "react"
import Sidebar from "../Sidebar"

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Overview")
  return (
    <div>
      <Sidebar
        selected={selectedTab}
        changeSelected={(selected) => setSelectedTab(selected)}
      />
    </div>
  )
}
export default Dashboard
