import { useState, useContext } from 'react';
import { QuestionContext } from '../components/context/question';
import HelmetMetaData from '../components/helmet_meta_data'
import Exam from '../components/test_practice/exam'
import StartExam from '../components/test_practice/start_exam'

export default function PracticeExams() {
    const { state, setState } = useContext(QuestionContext)
    const { isExamActive } = state

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
