import { useState } from "react"
import TestItem from "./TestItem"
import TestHeader from "./TestHeader"

const Tests = () => {
  const [selected, setSelected] = useState([]) //make into a list of all selected students later

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
      selected.every((item) => testList.includes(item)) &&
      testList.every((item) => selected.includes(item))
    ) {
      setSelected([])
    } else {
      setSelected(testList)
    }
  }

  let testList = []
  for (let i = 1; i <= 30; i++) {
    testList.push("Test #" + i)
  }

  return (
    <div className="flex flex-col bg-[#FFFDE8] h-screen w-auto">
      <div className="text-3xl font-bold text-[#545F71] py-10 ml-10">
        Tests
      </div>
      <div className="w-auto mx-10">
        <TestHeader
          handleSelectAll={handleSelectAll}
          selected={
            selected.every((item) => testList.includes(item)) &&
            testList.every((item) => selected.includes(item))
          }
        />
        <div className="w-auto h-[1px] bg-orange-300 mx-2"></div>
      </div>
      <div className="flex-1 w-auto mx-10 mb-10 overflow-y-scroll">
        {testList.map((name) => {
          return (
            <TestItem
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

export default Tests
