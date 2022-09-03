import { useState } from 'react'
import Exam from '../components/test_practice/exam'
import StartExam from '../components/test_practice/start_exam'

export default function PracticeExams() {
    const [statePage, setStatePage] = useState<number>(1)

    return (
        <>
            {
                statePage === 1 && (<StartExam
                    accepted={() => {
                        setStatePage(2)
                    }} />)
            }
            {
                statePage === 2 && (<Exam />)
            }
        </>
    )
}
