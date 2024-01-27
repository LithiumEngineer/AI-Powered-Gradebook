import { useState } from "react"
import StudentItem from "./StudentItem"
import StudentHeader from "./StudentHeader"
import PopupModal from "./PopupModal"

const Students = () => {
  const [selected, setSelected] = useState([]) //make into a list of all selected students later
  const [showPopup, setShowPopup] = useState(false)

  const handleSelect = (name) => {
    //if in list, remove. otherwise add to list
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

  let studentList = []
  for (let i = 1; i <= 30; i++) {
    studentList.push("Student #" + i)
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
        {studentList.map((name) => {
          return (
            <StudentItem
              name={name}
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
