import { useContext, useEffect, useMemo, useState } from 'react'
import { useParams } from "react-router-dom";
import { QuestionContext } from '../../context/question'
import AccordionLists from './accordion'
import Chart from './chart'
import ConfettiParty from './Confetti'
import MainApi, { IResultValidateExam, TFormType } from "./../../utils/axios"
import Loading from '../../loading'
import AccordionOptions from './accordion_options'
import style from './result.module.sass'
import _ from 'lodash';

export default function Result() {
    const {
        state,
        examsList
    } = useContext(QuestionContext)

    const { answers } = state

    const score = useMemo(() => {
        const questionScoreValue = 1000 / examsList.length
        let score = 0
        let passExam = false
        examsList.forEach(question => {
            const element = answers.filter(({ questionId }) => questionId === question.id.toString())
            if (element.length === 0) return

            if (_.difference(question.answers.map(x => x.toString), element[0].solutionId as any[])) {
                score += questionScoreValue
            }
        })

        score > 720 && {
            passExam: true
        }

        return {
            passExam,
            score
        }
    }, [
        examsList
    ])

    return (
        <>
            <div
                className={style.resultPage}
            >
                {score.passExam && <ConfettiParty />}
                <h1>{
                    score.passExam
                        ? "Paso el Examen 🎉🎉🎉"
                        : "No paso, intentalo nuevamente 😥😥😥"
                }</h1>
                <h3>Puntuación: {score.score.toFixed(2)} / 1000</h3>
                {/*        <Chart answerValidated={answerValidated} />*/}
                {/* <AccordionOptions answerValidated={answerValidated} /> */}
                {/* <AccordionLists answerValidated={answerValidated.answerValidated} /> */}
            </div>
        </>
    )
}
