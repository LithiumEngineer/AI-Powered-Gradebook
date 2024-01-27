import React from "react"
import { RiDeleteBinLine } from 'react-icons/ri'

const Button = ({ name, onClick, disabled = false }) => {
  if (name === "Delete") {
    return (
      <div
        onClick={onClick}
        className="bg-[#F09C67] w-fit border-2 border-solid border-[#F09C67] px-4 py-[6px] rounded-full text-sm text-white mr-3 hover:cursor-pointer hover:bg-[#FFFDE8] hover:text-[#F09C67] hover:underline duration-100"
      >
        <div className="flex justify-center items-center">
          <RiDeleteBinLine />
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={disabled ? null : onClick}
      className="bg-[#4C8492] w-fit border-2 border-solid border-[#4C8492] px-4 py-[6px] rounded-full text-sm text-white mr-3 hover:cursor-pointer hover:bg-[#FFFDE8] hover:text-[#4C8492] hover:underline duration-100"
    >
      {name}
    </div>
  )
}

export default Button
