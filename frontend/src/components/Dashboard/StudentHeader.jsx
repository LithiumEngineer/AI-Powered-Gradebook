import { GrFormCheckmark } from "react-icons/gr"
import Button from "./Button"
import React from "react"

const StudentHeader = ({ selected, handleSelectAll, openAddPopup }) => {
  return (
    <div className={`flex justify-between items-center h-12 w-full`}>
      <div className="flex items-center h-full">
        <div
          className={`w-5 h-5 ml-4 rounded-sm border-2 border-solid duration-100 hover:cursor-pointer ${
            selected
              ? "bg-[#F09C67] border-[#F09C67]"
              : "bg-white border-[#545F71]"
          }`}
          onClick={handleSelectAll}
        >
          <div>
            {selected && (
              <GrFormCheckmark className="w-full h-full text-white" />
            )}
          </div>
        </div>
        <div className={`ml-3 text-[#4C8492] font-bold`}>Name</div>
      </div>
      <div className="flex">
        {/*<Button name="Generate Worksheet(s)" onClick={undefined} />*/}
        <Button name="Add Student" onClick={openAddPopup}/>
      </div>
    </div>
  )
}
export default StudentHeader
