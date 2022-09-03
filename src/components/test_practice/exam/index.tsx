import { useContext, useEffect } from 'react'
import Loading from '../../loading'
import Footer from './footer'
import set1 from "./../../../assets/tests/developer_associate/setTest.json"
import Question from "./question"
import { QuestionContext } from '../../context/question'
import MainApi from "./../../utils/axios"
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
    answers: any
}

export default function Exam() {
    const {
        state,
        setState,
        questionLists,
        setQuestionLists
    } = useContext(QuestionContext)

    const getExam = async () => {
        try {
            const result = await MainApi.getForm("developer_associate", "1")
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
