import React, { useState } from "react"
import Button from "./Button"
import { IoIosCloseCircleOutline } from "react-icons/io"

const PopupModal = ({ open, onClose, type, student = null, test = null }) => {
  const [testName, setTestName] = useState("")
  const [material, setMaterial] = useState("")

  const submitForm = () => {
    //TODO
  }
  const cancelForm = () => {
    onClose()
    setTestName("")
    setMaterial("")
  }

  return (
    <div
      style={{ backgroundColor: "rgba(50, 50, 50, 0.8)" }}
      className={`fixed flex justify-around items-center top-0 left-0 h-screen w-screen z-30 ${
        !open && "hidden"
      }`}
    >
      <div className="flex flex-col relative flex-1 h-4/5 mx-20 bg-[#FFFDE8] rounded-lg">
        <IoIosCloseCircleOutline
          className="w-6 h-6 ml-auto mr-2 mt-2 hover:text-red-500 hover:cursor-pointer"
          onClick={onClose}
        />
        <div className="flex-1 flex flex-col h-auto mx-5 mt-2 mb-10">
          {type === "student" ? (
            <>
              <h1>
                {student.last_name}, {student.first_name}
              </h1>
              <br />
              <h2>Analytics go here.</h2>
            </>
          ) : type === "test" ? (
            <>
              <h1>Name: {test.name}</h1>
              <h2>Topic: {test.topic}</h2>
              <br />
              <h2>Analytics go here.</h2>
            </>
          ) : type == "addtest" ? (
            <>
              <div className="text-3xl text-[#545F71] font-bold">Add Test</div>
              <div className="flex flex-col mt-5">
                <div className="text-[#4C8492] font-thin">Test Name</div>
                <div className="border-[1px] border-solid border-[#4C8492] px-4 py-2 rounded-md">
                  <input
                    type="text"
                    placeholder="Enter Test Name"
                    className="bg-[#FFFDE8] w-full font-thin text-[#4C8492] outline-none"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col flex-1 mt-3">
                <div className="text-[#4C8492] font-thin">Subject Material</div>
                <div className="border-[1px] border-solid border-[#4C8492] h-full px-4 py-2 rounded-md">
                  <textarea
                    placeholder="Enter Subject Material"
                    className="resize-none bg-[#FFFDE8] w-full h-full font-thin text-[#4C8492] outline-none"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-5 flex justify-end">
                <Button name="Cancel" onClick={cancelForm} />
                <Button name="Submit" onClick={submitForm} />
              </div>
            </>
          ) : type == "addstudent" ? (
            <h1>Add student</h1>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default PopupModal
