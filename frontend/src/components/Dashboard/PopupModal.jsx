const PopupModal = ({ open, onClose, type, student, test }) => {
  return (
    <div
      style={{ backgroundColor: "rgba(50, 50, 50, 0.8)" }}
      className={`fixed flex justify-around items-center top-0 left-0 h-screen w-screen z-30 ${!open && "hidden"
        }`}
    >

      <div className="relative flex-1 h-4/5 mx-20 bg-white rounded-lg">
        <div className="w-fit ml-auto" onClick={onClose}>Close</div>
        {type === "student" ? (
          <>
            <h1>{student.last_name}, {student.first_name}</h1>
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
        ) : (
          null
        )}
      </div>
    </div>
  )
}

export default PopupModal
