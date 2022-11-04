import { useState, useContext, useEffect } from 'react';
import { QuestionContext } from '../components/context/question';
import HelmetMetaData from '../components/helmet_meta_data'
import Exam from '../components/test_practice/exam'
import StartExam from '../components/test_practice/start_exam'

export default function PracticeExams() {
    const { state, setState, setExams } = useContext(QuestionContext)
    const { isExamActive } = state

    useEffect(() => {
        return () => {
            setState(prevState => ({
                ...prevState,
                actualQuestion: 1,
                answers: [],
                isFinishExam: false,
                activeFlags: [],
                isExamActive: false
            }))
            setExams([])
        }
    }, [])


    return (
        <>
            <HelmetMetaData title="AWS Exam" />
            {isExamActive === false && (
                <StartExam
                    accepted={() => {
                        setState(prevState => ({
                            ...prevState,
                            isExamActive: true
                        }))
                    }} />
            )}
            {isExamActive && <Exam />}
        </>
    )
}
