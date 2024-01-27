import React from "react"

const Button = ({ name, onClick, disabled=false }) => {
  return (
    <div
      onClick={disabled? null : onClick}
      className="bg-[#4C8492] w-fit border-2 border-solid border-[#4C8492] px-4 py-[6px] rounded-full text-sm text-white mr-3 hover:cursor-pointer hover:bg-[#FFFDE8] hover:text-[#4C8492] hover:underline duration-100"
    >
      {name}
    </div>
  )
}

export default Button
