import { useContext, useEffect } from 'react'
import {
    useParams
} from "react-router-dom";
import Loading from '../../loading'
import Footer from './footer'
import Question from "./question"
import { QuestionContext } from '../../context/question'
import MainApi, { TFormType } from "./../../utils/axios"
import Result from '../results'

export interface IQuestionsLists {
    question: String,
    question_2?: String,
    options: string[],
    answer: string[],
    id: string
}

export interface IState {
    actualQuestion: number;
    activeFlags: number[]
    answers: {
        questionId: string,
        solutionId: string[]
    }[]
}

export default function Exam() {
    const {
        state,
        setState,
        questionLists,
        setQuestionLists
    } = useContext(QuestionContext)
    const { formType, id } = useParams();

    const getExam = async () => {
        try {
            const result = await MainApi.getForm(formType as TFormType, id as string)
            setQuestionLists(result)
        } catch ({ message }) {
            //TODO: Add modal fot the error
        }
    }

    useEffect(() => {
        getExam()
        return () => {
            setQuestionLists(null)
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
            {questionLists === null && <Loading />}
            {(questionLists !== null && state.isFinishExam === false) && (
                <>
                    <Question />
                    <Footer />
                </>
            )}
            {(questionLists !== null && state.isFinishExam) && (
                <Result />
            )}
        </div>
    )
}
