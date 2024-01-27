import { FaChevronRight } from "react-icons/fa6"


const SidebarItem = ({ name, icon, selected, changeSelected }) => {
  return (
    <div className="" onClick={changeSelected}>
      <div
        className={`p-1 flex justify-between items-center w-auto mx-2 rounded-lg hover:cursor-pointer duration-200 ${
          selected && "bg-[#F7E0A3]"
        }`}
      >
        <div className="flex items-center text-[#4C8492]">
          <div className="p-2">{icon}</div>
          <div className="text-sm">{name}</div>
        </div>
        <FaChevronRight className="mr-2 text-[#F09C67]" />
      </div>
    </div>
  )
}

export default SidebarItem
