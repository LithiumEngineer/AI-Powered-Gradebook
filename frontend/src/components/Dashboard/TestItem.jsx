import { GrFormCheckmark } from "react-icons/gr"
import Button from "./Button"

const TestItem = ({ id, name, selected, handleSelect, viewDetails }) => {
  return (
    <div
      className={`flex justify-between items-center h-12 w-full rounded-sm ${
        selected ? "bg-[#F7E0A3]" : "hover:bg-[#fef0c9]"
      } duration-100`}
    >
      <div className="flex items-center h-full">
        <div
          className={`w-5 h-5 ml-4 rounded-sm border-2 border-solid duration-100 hover:cursor-pointer ${
           selected
              ? "bg-[#F09C67] border-[#F09C67]"
              : "bg-white border-[#545F71]"
          }`}
          onClick={() => handleSelect(id)}
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
      <Button name="Details" onClick={viewDetails}/>
    </div>
  )
}
export default TestItem
