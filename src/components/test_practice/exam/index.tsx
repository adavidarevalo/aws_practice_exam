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

// export interface IQuestionsLists {
//     question: String,
//     question_2?: String,
//     options: string[],
//     answer: string[],
//     id: string
// }

// export interface IState {
//     actualQuestion: number;
//     activeFlags: number[]
//     answers: {
//         questionId: string,
//         solutionId: string[]
//     }[]
// }


//.sort(() => Math.random() - 0.5)

export default function Exam() {
    const {
        state,
        setState,
        examsList,
        setExams
    } = useContext(QuestionContext)
    const { formType, id } = useParams();

    const getExam = async () => {
        const exam = exams[`${formType?.replace("aws_", "")}${id}` as examList]
        setExams(exam as any[])
    }

    useEffect(() => {
        getExam()
        return () => {
            setState(prevState => ({
                ...prevState,
                actualQuestion: 1,
                answers: [],
                isFinishExam: false
            }))
        }
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
