import { useState, useEffect } from "react"
import axios from "axios"
import StudentItem from "./StudentItem"
import StudentHeader from "./StudentHeader"
import PopupModal from "./PopupModal"

const Students = () => {
  useEffect(() => {
    axios.get("http://localhost:3500/students").then((res) => {
      setStudentList(res.data)
    })
  }, [])

  const [selected, setSelected] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [studentList, setStudentList] = useState([])

  const handleSelect = (name) => {
    if (!selected.includes(name)) {
      setSelected([...selected, name])
    } else {
      setSelected(selected.filter((item) => item != name))
    }
  }

  const handleSelectAll = () => {
    if (
      selected.every((item) => studentList.includes(item)) &&
      studentList.every((item) => selected.includes(item))
    ) {
      setSelected([])
    } else {
      setSelected(studentList)
    }
  }

  const closePopUp = () => {
    setShowPopup(false)
  }

  const openPopUp = () => {
    setShowPopup(true)
  }

  return (
    <div className="flex flex-col bg-[#FFFDE8] h-screen w-auto">
      <PopupModal open={showPopup} onClose={() => closePopUp()} />
      <div className="text-3xl font-bold text-[#545F71] py-10 ml-10">
        Students
      </div>
      <div className="w-auto mx-10">
        <StudentHeader
          handleSelectAll={handleSelectAll}
          selected={
            selected.every((item) => studentList.includes(item)) &&
            studentList.every((item) => selected.includes(item))
          }
        />
        <div className="w-auto h-[1px] bg-orange-300 mx-2"></div>
      </div>
      <div className="flex-1 w-auto mx-10 mb-10 overflow-y-scroll">
        {studentList.map((student) => {
          return (
            <StudentItem
              key={student.id}
              name={student.first_name + " " + student.last_name}
              selected={selected.includes(name)}
              handleSelect={handleSelect}
              viewDetails={() => setShowPopup(true)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Students
