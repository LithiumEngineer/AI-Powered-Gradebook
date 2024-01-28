import React, { useState, useEffect } from "react"
import Button from "./Button"
import { RingLoader } from "react-spinners"
import { IoIosCloseCircleOutline } from "react-icons/io"
import axios from "axios"
import { useAuth0 } from "@auth0/auth0-react"
import Chart from "./Chart"
import { IoIosCheckmarkCircle } from "react-icons/io"

const PopupModal = ({
  open,
  onClose,
  type,
  student = null,
  test = null,
  sub,
  genJson = null,
}) => {
  const [studentList, setStudentList] = useState([])
  const [gradesList, setGradesList] = useState({})
  const [testName, setTestName] = useState("")
  const [material, setMaterial] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const { isAuthenticated, user } = useAuth0()

  useEffect(() => {
    // @ts-ignore
    axios
      // @ts-ignore
      .get(`${import.meta.env.VITE_API_URL}/students/${user.sub}`)
      .then((res) => {
        setStudentList(res.data)
        let newGradesList = {}
        res.data.forEach((student) => {
          newGradesList[student.id] = -1
        })
        setGradesList(newGradesList)
        setIsLoading(false)
      })
  }, [])

  const submitTestForm = async () => {
    setIsLoading(true)
    const json = studentList.map((student) => {
      return {
        student_id: student.id,
        grade: gradesList[student.id],
      }
    })
    console.log(json)
    try {
      // @ts-ignore
      await axios.post(`${import.meta.env.VITE_API_URL}/tests`, {
        name: testName,
        topic: material,
        student_grades_json: JSON.stringify({ json }),
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
      // @ts-ignore
      await axios.post(`${import.meta.env.VITE_API_URL}/students`, {
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
              <div className="flex items-center text-5xl text-[#52da57] font-bold w-fit h-fit mx-auto my-auto">
                <div>Success!</div>
                <IoIosCheckmarkCircle />
              </div>
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
              <div className="text-3xl text-[#4C8492] font-bold">
                {student.first_name} {student.last_name}
              </div>
              <div className="flex justify-around items-center py-5 w-full h-full">
                <Chart
                  id={student.id}
                  name={student.first_name + " " + student.last_name}
                  genJson={genJson}
                />
              </div>
            </>
          ) : type === "test" ? (
            <>
              <div className="flex flex-col mt-3">
                <div className="text-[#4C8492] font-thin">Test Name</div>
                <div className="border-[1px] border-solid border-[#4C8492] max-h-[42px] px-4 py-2 rounded-md ">
                  <div className="bg-[#FFFDE8] w-full h-full font-thin text-[#4C8492] outline-none overflow-y-scroll">
                    {test.name}
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <div className="text-[#4C8492] font-thin">Subject Material</div>
                <div className="border-[1px] border-solid border-[#4C8492] max-h-[84px] h-full px-4 py-2 rounded-md ">
                  <div className="bg-[#FFFDE8] w-full h-full font-thin text-[#4C8492] outline-none overflow-y-scroll">
                    {test.topic}
                  </div>
                </div>
              </div>
              <div className="flex mt-2 w-full h-fit text-[#4C8492] border-b-[1px] border-solid border-[#f0d2bf]">
                <div className="px-4 py-2">Grade</div>
                <div className="px-4 py-2">Name</div>
              </div>
              <div className="flex-1 overflow-y-scroll">
                {test?.student_grades_json
                  ? studentList.map((student) => (
                      <div className="flex items-center w-full py-2 border-b-[1px] border-solid border-[#f0d2bf]">
                        <div
                          className="flex justify-around items-center ml-5 h-10 w-10 rounded-lg font-bold border-[1px] border-solid border-[#4C8492] text-[#4C8492] outline-none"
                          style={{
                            backgroundColor: `hsl(${
                              JSON.parse(test.student_grades_json).json.find(
                                (studentGrade) =>
                                  studentGrade.student_id === student.id
                              ).grade * 1.2
                            }, 100%, 50%)`,
                          }}
                        >
                          {JSON.parse(test.student_grades_json).json.find(
                            (studentGrade) =>
                              studentGrade.student_id === student.id
                          ).grade === -1
                            ? null
                            : JSON.parse(test.student_grades_json).json.find(
                                (studentGrade) =>
                                  studentGrade.student_id === student.id
                              ).grade}
                        </div>

                        <div className="ml-8 text-[#4C8492]">
                          {student.last_name + ", " + student.first_name}
                        </div>
                      </div>
                    ))
                  : null}
              </div>
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
                {studentList.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center w-full py-2 border-b-[1px] border-solid border-[#f0d2bf]"
                  >
                    <input
                      type="number"
                      className="text-center ml-5 h-10 w-10 rounded-lg font-bold border-[1px] border-solid border-[#4C8492] text-[#5ec75d] outline-none"
                      value={
                        gradesList[student.id] === -1
                          ? ""
                          : gradesList[student.id]
                      }
                      onChange={(e) => {
                        let newGradesList = { ...gradesList }
                        if (parseInt(e.target.value) > 100)
                          newGradesList[student.id] = 100
                        else if (parseInt(e.target.value) < 0)
                          newGradesList[student.id] = 0
                        else if (!e.target.value) newGradesList[student.id] = -1
                        else newGradesList[student.id] = e.target.value
                        setGradesList(newGradesList)
                      }}
                    />
                    <div className="ml-8 text-[#4C8492]">
                      {student.last_name + ", " + student.first_name}
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
