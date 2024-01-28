import React from "react"

const Overview = ({ name }) => {
  return (
    <div className="flex flex-col bg-[#FFFDE8] h-screen w-auto">
      <div className="flex flex-col items-center mx-auto my-auto">
        <img src="WorkSheeps.png" className="w-60" />
        <div className="mt-5 text-3xl font-bold text-[#4C8492]">Welcome to your WorkSheeps portal, {name}!</div>
      </div>
    </div>
  )
}
export default Overview
