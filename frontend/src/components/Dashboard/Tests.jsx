import { useState, useEffect } from "react"
import axios from "axios"
import TestItem from "./TestItem"
import TestHeader from "./TestHeader"
import PopupModal from "./PopupModal"
import React from "react"
import { RingLoader } from "react-spinners"

const Tests = ({ sub }) => {
  const [selected, setSelected] = useState([])
  const [showDetailsPopup, setShowDetailsPopup] = useState(false)
  const [showAddPopup, setShowAddPopup] = useState(false)
  const [testList, setTestList] = useState([])
  const [test, setTest] = useState({}) // for popup modal
  const [deletedLoading, setDeletedLoading] = useState(false)

  useEffect(() => {
    if (showAddPopup) return;
    axios.get(`http://localhost:3500/tests/${sub}`).then((res) => {
      setTestList(res.data)
    })
  }, [showAddPopup])

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
      testList.every((test) => selected.includes(test.id)) &&
      testList.length !== 0
    ) {
      setSelected([])
    } else {
      setSelected(testList.map((test) => test.id))
    }
  }

  const handleDelete = async (id) => {
    setDeletedLoading(true)
    try {
      await axios.delete(`http://localhost:3500/tests`, { data: { record_id: id } })
    } catch (err) {
      console.log(err)
    }

    axios.get(`http://localhost:3500/tests/${sub}`).then((res) => {
      setDeletedLoading(false)
      setSelected([])
      setTestList(res.data)
    })
  }

  const closeDetailsPopUp = () => {
    setShowDetailsPopup(false)
  }

  const openDetailsPopUp = (id) => {
    setShowDetailsPopup(true)
    setTest(testList.find((test) => test.id === id))
  }

  const openAddPopup = () => {
    setShowAddPopup(true)
  }

  const closeAddPopup = () => {
    setShowAddPopup(false)
  }

  if (deletedLoading) return <div className="flex h-screen bg-[#FFFDE8] justify-center items-center align-middle"><RingLoader /></div>;

  return (
    <div className="flex flex-col bg-[#FFFDE8] h-screen w-auto">
      <PopupModal
        open={showAddPopup}
        onClose={() => closeAddPopup()}
        type="addtest"
        sub={sub}
      />
      <PopupModal
        open={showDetailsPopup}
        onClose={() => closeDetailsPopUp()}
        type="test"
        test={test}
        sub={sub}
      />
      <div className="text-3xl font-bold text-[#545F71] py-10 ml-10">Tests</div>
      <div className="w-auto mx-10">
        <TestHeader
          handleSelectAll={handleSelectAll}
          selected={
            testList.every((test) => selected.includes(test.id)) &&
            testList.length !== 0
          }
          openAddPopup={openAddPopup}
        />
        <div className="w-auto h-[1px] bg-orange-300 mx-2"></div>
      </div>
      <div className="flex-1 w-auto mx-10 mb-10 overflow-y-scroll">
        {testList.map((test) => {
          return (
            <TestItem
              key={test.id}
              id={test.id}
              name={test.name}
              selected={selected.includes(test.id)}
              handleSelect={handleSelect}
              handleDelete={handleDelete}
              openDetailsPopUp={openDetailsPopUp}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Tests
