import React, { useState, useEffect } from "react";
import { RingLoader } from "react-spinners";
import { CohereClient } from 'cohere-ai';

const CoHere = ({ student_test_data, setShowCoHere, question_num=10 }) => {
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchResult = async () => {
            const cohere = new CohereClient({
                // @ts-ignore
                token: import.meta.env.VITE_COHERE_API_KEY,
            });

            try {
                console.log("Generating result...");
                const result = await cohere.generate({
                    prompt: "I will give you test data for a student, which will consist of a stringified JSON of tests, their topics and the student's corresponding scores. Your task is to create a worksheet targetting the student's weaknesses to help them improve.\n"
                        + "Test Data: " + JSON.stringify(student_test_data) + "\n" +
                        "Return a worksheet with "+question_num+" questions, in a .txt format. Don't print anything other than the worksheet.",
                    maxTokens: 1000
                });
                console.log(result);
                setResult(result);
            } catch (error) {
                console.error('Error fetching result:', error);
            }
        };

        if (!result) fetchResult();
    }, []);

    if (!result) return <div className="flex h-screen bg-[#FFFDE8] justify-center items-center align-middle"><RingLoader /></div>;

    return (
        <div className="m-4 p-4 border rounded-lg bg-gray-100">
            <h1 className="text-lg font-semibold mb-4">Generated Worksheet:</h1>
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700">
                {result.generations[0].text}
            </pre>
        </div>
    );
}

export default CoHere;