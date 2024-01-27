import { useState } from "react"
import StudentItem from "./StudentItem"
import StudentHeader from "./StudentHeader"

const Students = () => {
  const [selected, setSelected] = useState([]) //make into a list of all selected students later
  const handleSelect = (name) => {
    //if in list, remove. otherwise add to list
    if (!selected.includes(name)) {
      setSelected([...selected, name])
    } else {
      setSelected(selected.filter((item) => item != name))
    }
  }

  let studentList = ["Student #1", "Student #2", "Student #3"]

  return (
    <div className="bg-[#FFFDE8] h-screen w-auto">
        <div className="text-3xl font-bold text-[#545F71] py-10 ml-10">Students</div>
      <div className="h-full w-auto mx-10">
        <StudentHeader />
        <div className="w-auto h-[1px] bg-orange-300 mx-2"></div>
        {studentList.map((name) => {
          return (
            <StudentItem
              name={name}
              selected={selected.includes(name)}
              handleSelect={handleSelect}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Students
