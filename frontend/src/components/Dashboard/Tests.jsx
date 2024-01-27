import { useState, useEffect } from "react"
import axios from "axios"
import TestItem from "./TestItem"
import TestHeader from "./TestHeader"
import PopupModal from "./PopupModal"

const Tests = () => {
  useEffect(() => {
    axios.get("http://localhost:3500/tests").then((res) => {
      setTestList(res.data)
    })
  }, [])

  const [selected, setSelected] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [testList, setTestList] = useState([])

  const handleSelect = (test) => {
    //if in list, remove. otherwise add to list
    if (!selected.includes(test)) {
      setSelected([...selected, test])
    } else {
      setSelected(selected.filter((item) => item != test))
    }
  }

  const handleSelectAll = () => {
    if (
      testList.every((test) => selected.includes(test.id))
    ) {
      setSelected([])
    } else {
      setSelected(testList.map((test) => test.id))
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
      <div className="text-3xl font-bold text-[#545F71] py-10 ml-10">Tests</div>
      <div className="w-auto mx-10">
        <TestHeader
          handleSelectAll={handleSelectAll}
          selected={
            testList.every((test) => selected.includes(test.id))
          }
        />
        <div className="w-auto h-[1px] bg-orange-300 mx-2"></div>
      </div>
      <div className="flex-1 w-auto mx-10 mb-10 overflow-y-scroll">
        {testList.map((test) => {
          return (
            <TestItem
              key={test.id}
              id={test.id}
              name={test.topic}
              selected={selected.includes(test.id)}
              handleSelect={handleSelect}
              viewDetails={() => setShowPopup(true)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Tests
