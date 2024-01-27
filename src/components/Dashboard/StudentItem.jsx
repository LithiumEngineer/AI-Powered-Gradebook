import { GrFormCheckmark } from "react-icons/gr"

const StudentItem = ({ name, selected, handleSelect }) => {
  return (
    <div
      className={`flex justify-between items-center h-12 w-full rounded-sm ${
        selected && "bg-[#F7E0A3]"
      } duration-100`}
    >
      <div className="flex items-center h-full">
        <div
          className={`w-5 h-5 ml-4 rounded-sm border-2 border-solid duration-100 hover:cursor-pointer ${
            selected
              ? "bg-[#F09C67] border-[#F09C67]"
              : "bg-white border-[#545F71]"
          }`}
          onClick={() => handleSelect(name)}
        >
          <div>
            {selected && (
              <GrFormCheckmark className="w-full h-full text-white" />
            )}
          </div>
        </div>
        <div className={`ml-3 text-[#4C8492] ${selected && "font-bold"}`}>
          {name}
        </div>
      </div>
      <div className="bg-[#4C8492] px-4 py-2 rounded-full text-sm text-white mr-3 hover:cursor-pointer">
        Details
      </div>
    </div>
  )
}
export default StudentItem
