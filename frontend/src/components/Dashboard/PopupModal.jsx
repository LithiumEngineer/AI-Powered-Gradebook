import React, { useState, useEffect } from "react"
import Button from "./Button"
import { RingLoader } from "react-spinners"
import { IoIosCloseCircleOutline } from "react-icons/io"
import axios from "axios"
import { useAuth0 } from "@auth0/auth0-react"

const PopupModal = ({
  open,
  onClose,
  type,
  student = null,
  test = null,
  sub,
}) => {
  const [studentList, setStudentList] = useState([])
  const [testName, setTestName] = useState("")
  const [material, setMaterial] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const { isAuthenticated, user } = useAuth0()

  useEffect(() => {
    axios.get(`http://localhost:3500/students/${user.sub}`).then((res) => {
      setStudentList(res.data)
      setIsLoading(false)
    })
  }, [])

  const submitTestForm = async () => {
    setIsLoading(true)
    try {
      await axios.post("http://localhost:3500/tests", {
        name: testName,
        topic: material,
        student_grades_json: JSON.stringify({
          Student1: "0.98",
          Student2: "0.86",
        }),
        test_type: "N/A",
        owner_id: sub,
      })
    } catch (err) {
      console.log(err)
    }

    setIsLoading(false)
    setIsCompleted(true)
    setTestName("")
    setMaterial("")
  }

  const submitStudentForm = async () => {
    setIsLoading(true)

    try {
      await axios.post("http://localhost:3500/students", {
        first_name: firstName,
        last_name: lastName,
        teacher_id: sub,
      })
    } catch (err) {
      console.log(err)
    }

    setIsLoading(false)
    setIsCompleted(true)
    setFirstName("")
    setLastName("")
  }

  const cancelForm = () => {
    onClose()
    setTestName("")
    setMaterial("")
  }

  if (isLoading || isCompleted)
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
            onClick={() => {
              setIsLoading(false)
              setIsCompleted(false)
              onClose()
            }}
          />
          <div className="flex-1 flex flex-col h-auto mx-5 mt-2 mb-10">
            {isCompleted ? (
              <h1 className="text-3xl text-[#545F71] font-bold">Success!</h1>
            ) : (
              <div className="flex h-full bg-[#FFFDE8] justify-center items-center align-middle">
                <RingLoader />
              </div>
            )}
          </div>
        </div>
      </div>
    )

  return (
    <div
      style={{ backgroundColor: "rgba(50, 50, 50, 0.8)" }}
      className={`fixed flex justify-around items-center top-0 left-0 h-screen w-screen z-30 ${
        !open && "hidden"
      }`}
    >
      <div className="flex flex-col relative flex-1 h-4/5 mx-20 bg-[#FFFDE8] rounded-lg">
        <IoIosCloseCircleOutline
          className="min-w-6 min-h-6 ml-auto mr-2 mt-2 hover:text-red-500 hover:cursor-pointer"
          onClick={onClose}
        />
        <div className="flex-1 flex flex-col h-4/5 mx-5 mt-2 mb-10">
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
              <div className="h-[100px] flex flex-col mt-3">
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
              <div className="flex mt-2 w-full h-fit text-[#4C8492] border-b-[1px] border-solid border-[#f0d2bf]">
                <div className="px-4 py-2">Grade</div>
                <div className="px-4 py-2">Name</div>
              </div>
              <div className="flex-1 overflow-y-scroll">
                {studentList.map((value) => (
                  <div className="flex items-center w-full py-2 border-b-[1px] border-solid border-[#f0d2bf]">
                    <input
                      type="text"
                      className="text-center ml-5 h-10 w-10 rounded-lg font-bold border-[1px] border-solid border-[#4C8492] text-[#4C8492] outline-none"
                    />
                    <div className="ml-8 text-[#4C8492]">
                      {value.last_name + ", " + value.first_name}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 h-fit flex justify-end">
                <Button name="Cancel" onClick={cancelForm} />
                <Button name="Submit" onClick={submitTestForm} />
              </div>
            </>
          ) : type == "addstudent" ? (
            <>
              <div className="text-3xl text-[#545F71] font-bold">
                Add Student
              </div>
              <div className="flex flex-col mt-5">
                <div className="text-[#4C8492] font-thin">First Name</div>
                <div className="border-[1px] border-solid border-[#4C8492] px-4 py-2 rounded-md">
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    className="bg-[#FFFDE8] w-full font-thin text-[#4C8492] outline-none"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col mt-5">
                <div className="text-[#4C8492] font-thin">Last Name</div>
                <div className="border-[1px] border-solid border-[#4C8492] px-4 py-2 rounded-md">
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    className="bg-[#FFFDE8] w-full font-thin text-[#4C8492] outline-none"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-5 flex justify-end">
                <Button name="Cancel" onClick={cancelForm} />
                <Button name="Submit" onClick={submitStudentForm} />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default PopupModal
