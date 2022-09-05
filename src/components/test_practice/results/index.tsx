import { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { QuestionContext } from '../../context/question'
import AccordionLists from './accordion'
import Chart from './chart'
import ConfettiParty from './Confetti'
import MainApi, { IResultValidateExam, TFormType } from "./../../utils/axios"
import Loading from '../../loading'
import AccordionOptions from './accordion_options'
import style from './result.module.sass'

export default function Result() {
    const {
        state
    } = useContext(QuestionContext)

    const [answerValidated, setAnswerValidated] = useState<IResultValidateExam | null>(null)
    const { formType, id } = useParams();

    const validateExam = async () => {
        try {
            const result = await MainApi.validateExam({
                "formId": id as string,
                "type": formType as TFormType,
                "answers": state.answers
            })
            setAnswerValidated(result)
        } catch (error) {
            //TODO: Add modal fot the error
        }
    }

    useEffect(() => {
        validateExam()
    }, [])

    return (
        <>
            {!!answerValidated === false && <Loading />}
            {!!answerValidated && (
                <div
                    className={style.resultPage}
                >
                    {answerValidated.passExam && <ConfettiParty />}
                    <h1>{
                        answerValidated.passExam
                            ? "Paso el Examen 🎉🎉🎉"
                            : "No paso, intentalo nuevamente 😥😥😥"
                    }</h1>
                    <h3>Puntuación: {answerValidated.score} / 1000</h3>
                    <Chart answerValidated={answerValidated} />
                    <AccordionOptions answerValidated={answerValidated} />
                    <AccordionLists answerValidated={answerValidated.answerValidated} />
                </div>
            )}
        </>
    )
}
