import { useContext, useEffect, useState } from 'react'
import ChangeLanguageButton from '../../change_language_button'
import { QuestionContext } from '../../context/question'
import AccordionLists from './accordion'
import Chart from './chart'
import ConfettiParty from './Confetti'
import MainApi, { IResultValidateExam } from "./../../utils/axios"
import Loading from '../../loading'
import AccordionOptions from './accordion_options'

export default function Result() {
    const {
        state
    } = useContext(QuestionContext)

    const [answerValidated, setAnswerValidated] = useState<IResultValidateExam | null>(null)

    const validateExam = async () => {
        try {
            const result = await MainApi.validateExam({
                "formId": "1",
                "type": "developer_associate",
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
                <div style={{ width: "100vw" }}>
                    {answerValidated.passExam && <ConfettiParty />}
                    <h1>{
                        answerValidated.passExam
                            ? "Paso el Examen 🎉🎉🎉"
                            : "No paso, intentalo nuevamente 😥😥😥"
                    }</h1>
                    <h3>Puntuación: {answerValidated.score}</h3>
                    <Chart answerValidated={answerValidated} />
                    <AccordionOptions answerValidated={answerValidated} />
                    <AccordionLists answerValidated={answerValidated.answerValidated} />
                </div>
            )}
        </>
    )
}
