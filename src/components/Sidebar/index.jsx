import { FaChevronLeft } from "react-icons/fa6"
import {
  HiOutlineRectangleStack,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineCog6Tooth,
  HiOutlineArrowLeftOnRectangle,
  HiOutlinePlusCircle,
} from "react-icons/hi2"
import SidebarItem from "./SidebarItem"
import { useAuth0 } from "@auth0/auth0-react"

const Sidebar = ({ selected, changeSelected }) => {
  const { logout } = useAuth0()
  return (
    <div className="flex flex-col justify-between h-screen w-[200px] bg-[#FFF8B4]">
      <div className="flex flex-col mt-2">
        <SidebarItem
          name="Overview"
          icon={<HiOutlineRectangleStack />}
          selected={selected === "Overview"}
          changeSelected={() => changeSelected("Overview")}
        />
        <SidebarItem
          name="Students"
          icon={<HiOutlineUsers />}
          selected={selected === "Students"}
          changeSelected={() => changeSelected("Students")}
        />
        <SidebarItem
          name="Tests"
          icon={<HiOutlineDocumentText />}
          selected={selected === "Tests"}
          changeSelected={() => changeSelected("Tests")}
        />
      </div>
      <div className="flex flex-col mb-5">
        <SidebarItem
          icon={<HiOutlineCog6Tooth />}
          name="Settings"
          selected={selected === "Settings"}
          changeSelected={() => changeSelected("Settings")}
        />
        
        <SidebarItem
          icon={<HiOutlineArrowLeftOnRectangle />}
          name="Sign out"
          changeSelected={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        />
      </div>
    </div>
  )
}

export default Sidebar
