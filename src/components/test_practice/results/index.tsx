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
import { getStore, setStore } from './../../utils/store'

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
        const answerValidated = {
            answerCorrect: 0,
            answerIncorrect: 0,
            answerOmitted: 0,
        }

        examsList.forEach(question => {
            const element = answers.filter(({ questionId }) => questionId === question.id.toString())
            if (element.length === 0) {
                answerValidated.answerOmitted += 1
                return
            }

            if (_.difference(element[0].solutionId.map(x => Number(x)), question.answers).length > 0) {
                answerValidated.answerIncorrect += 1
                return
            }

            answerValidated.answerCorrect += 1
            score += questionScoreValue
        })
        if (score >= 750) {
            passExam = true
        }
        return {
            passExam,
            score,
            answerValidated
        }
    }, [
        examsList
    ])

    const updateStore = () => {
        const url = window.location.pathname.split('/')
        const progress = getStore('myProgress')

        const data = {
            set: url[url.length - 1],
            type: url[url.length - 2],
            ...score,
            date: new Date()
        }

        if (!!progress === false) {
            setStore('myProgress', [data])
            return
        }

        if (data.set !== progress[progress.length - 1].set
        ) {
            setStore('myProgress', [
                ...progress,
                data
            ])
        }
    }

    useEffect(() => {
        updateStore()
    }, [])


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
                <Chart answerValidated={score.answerValidated} />
                <AccordionOptions answerValidated={score.answerValidated} />
                <AccordionLists />
            </div>
        </>
    )
}
