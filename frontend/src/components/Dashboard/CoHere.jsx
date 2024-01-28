import React, { useState, useEffect } from "react"
import { RingLoader } from "react-spinners"
import { CohereClient } from "cohere-ai"
import jsPDF from "jspdf"

const CoHere = ({ student_test_data, setShowCoHere, question_num = 10 }) => {
  const [result, setResult] = useState(null)

  const handleDownloadPDF = (e) => {
    e.preventDefault()
    if (result) {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const text = result.generations[0].text
      const textLines = pdf.splitTextToSize(
        text,
        pdf.internal.pageSize.width - 20
      )

      let cursorY = 10
      let currentPage = 1

      textLines.forEach((line) => {
        if (cursorY > pdf.internal.pageSize.height - 20) {
          pdf.addPage()
          cursorY = 10
          currentPage++
        }

        pdf.text(line, 10, cursorY)
        cursorY += 10
      })

      pdf.save(`Worksheet.pdf`)
    }
  }

  useEffect(() => {
    const fetchResult = async () => {
      const cohere = new CohereClient({
        // @ts-ignore
        token: import.meta.env.VITE_COHERE_API_KEY,
      })

      try {
        console.log("Generating result...")
        const res = await cohere.generate({
          prompt:
            "I will give you test data for a student, which will consist of a stringified JSON of tests, their topics and the student's corresponding scores. Your task is to create a worksheet targetting the student's weaknesses to help them improve.\n" +
            "Test Data: " +
            JSON.stringify(student_test_data) +
            "\n" +
            "Return a worksheet with " +
            question_num +
            " questions, in a .txt format. Don't print anything other than the worksheet.",
          maxTokens: 1000,
        })
        if (!result) setResult(res)
      } catch (error) {
        console.error("Error fetching result:", error)
      }
    }

    if (!result) fetchResult()
  }, [])

  if (!result)
    return (
      <div className="flex h-screen bg-[#FFFDE8] justify-center items-center align-middle">
        <RingLoader />
      </div>
    )

  return (
    <div className="m-4 p-4 border rounded-lg bg-[#FFFDE8] h-5/6 overflow-y-scroll mt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold mb-4">Generated Worksheet:</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDownloadPDF}
        >
          {" "}
          Download PDF{" "}
        </button>
      </div>
      <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700">
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test test test test test test test test test test test
        test test test test
      </pre>
    </div>
  )
}

export default CoHere
