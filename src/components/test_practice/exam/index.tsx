import { useContext, useEffect } from 'react'
import {
    useParams
} from "react-router-dom";
import Loading from '../../loading'
import Footer from './footer'
import Question from "./question"
import { examList, IExam, QuestionContext } from '../../context/question'
import Result from '../results'
import exams from './../../../assets/exams/index'

export default function Exam() {
    const {
        state,
        setState,
        setExams
    } = useContext(QuestionContext)
    const { formType, id } = useParams();

    const getExam = async () => {
        const exam = exams[`${formType?.replace("aws_", "")}${id}` as examList]
        setExams(exam as any[])
    }

    useEffect(() => {
        getExam()
    }, [])

    return (
        <div>
            {(state.isFinishExam === false) && (
                <>
                    <Question />
                    <Footer />
                </>
            )}
            {state.isFinishExam && (
                <Result />
            )}
        </div>
    )
}
