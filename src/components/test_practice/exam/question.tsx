import { useContext, useMemo, useState } from 'react'
import { Button, Checkbox, Form, Icon, Popup } from 'semantic-ui-react'
import _ from "lodash"
import { IQuestion, IState, QuestionContext } from '../../context/question'
import ChangeLanguageButton from '../../change_language_button'

interface IQuestionData {
    question: string,
    options: {
        value: string;
        id: String;
    }[]
    question_2?: string,
    url?: string,
    id: string
}

interface IExam {
    questions: string[],
    options: {
        id: number,
        value: string
    }[]
}

export type TQuestions = "question1" | "question2" | "question3" | "question4" | "question5" | "question6" | "question7" | "question8" | "question9" | "question10"

export default function Question() {
    const {
        state,
        setState,
        examsList,
    } = useContext(QuestionContext)

    const { actualQuestion, activeFlags } = state

    const { questions, options } = useMemo<IExam>(() => {
        if (examsList.length === 0) return {
            options: [],
            questions: []
        };
        const questions: any = []

        for (let key in examsList[actualQuestion - 1][state.language]) {
            if (key.includes("question")) {
                const result = examsList[actualQuestion - 1][state.language]
                questions.push(result[key as TQuestions])
            }
        }

        return {
            questions,
            options: examsList[actualQuestion - 1][state.language]["options"]
        }
    }, [actualQuestion, state.language, examsList])

    const handleNextQuestion = () => {
        setState(prevState => ({
            ...prevState,
            actualQuestion: actualQuestion + 1
        }))
    }

    const handleBackQuestion = () => {
        setState(prevState => ({
            ...prevState,
            actualQuestion: actualQuestion - 1
        }))
    }

    const handleSaveFlag = () => {
        if (activeFlags.includes(actualQuestion)) {
            setState(prevState => {
                const activeFlagsCloned = _.cloneDeep(activeFlags)
                activeFlagsCloned.filter((id: number) => id !== actualQuestion)
                return ({
                    ...prevState,
                    activeFlags: activeFlagsCloned.filter((id: number) => id !== actualQuestion)
                })
            })
            return
        }
        setState(prevState => ({
            ...prevState,
            activeFlags: [...prevState.activeFlags, actualQuestion]
        }))
    }

    const modifyAnswer = (stateCloned: IState, value: string): IState => {
        stateCloned.answers = stateCloned.answers.map(answer => {
            if (answer.questionId === actualQuestion.toString()) {
                if (answer.solutionId.includes(value)) {
                    answer.solutionId = answer.solutionId.filter(solution => solution !== value)
                } else {
                    answer.solutionId = [...answer.solutionId, value as string]
                }
            }
            return answer
        })
        return stateCloned
    }

    const handleSelect = (value: string) => {
        setState(prevState => {
            const stateCloned = _.cloneDeep(prevState)
            if (stateCloned.answers.find(({ questionId }) => questionId === actualQuestion.toString())) {
                return modifyAnswer(stateCloned, value)
            }
            stateCloned.answers.push({
                questionId: actualQuestion.toString(),
                solutionId: [value as string]
            })
            return stateCloned
        })
    }

    if (_.isArray(examsList) === false) return <></>

    return (
        <div>
            <div style={{
                width: "90%",
                margin: "20px auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around"
            }}>
                <ChangeLanguageButton />
                <div>
                    <span style={{ marginRight: "10px" }}>{actualQuestion}/{examsList?.length}</span>
                    <Popup content='Agrega un distintiva a esta pregunta.' trigger={
                        <Icon
                            fitted
                            color={activeFlags.includes(actualQuestion) ? 'yellow' : 'grey'}
                            name='flag'
                            style={{ cursor: "pointer" }}
                            onClick={handleSaveFlag}
                        />
                    } />
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", height: "80vh" }}>
                <Button
                    icon
                    onClick={handleBackQuestion}
                    disabled={actualQuestion === 1}
                >
                    <Icon name='angle double left' />
                </Button>
                <div style={{ width: "80%", margin: "0 auto", maxWidth: "800px" }}>
                    {questions.map((question, index) => (
                        <h3 key={index}>{question}</h3>
                    ))}
                    <Form style={{ marginTop: "30px" }}>
                        {options.map((option) => (
                            <Form.Field key={option.id}>
                                <Checkbox
                                    radio
                                    label={option.value}
                                    name='checkboxRadioGroup'
                                    value={option.id.toString()}
                                    checked={state.answers.find(({ questionId }) => questionId === actualQuestion.toString())?.solutionId.includes(option.id.toString())}
                                    onClick={(e, { value }) => handleSelect(value as string)}
                                />
                            </Form.Field>
                        ))}
                    </Form>
                </div>
                <Button
                    icon
                    disabled={actualQuestion === examsList.length}
                    onClick={handleNextQuestion}
                >
                    <Icon name='angle double right' />
                </Button>
            </div>
        </div>
    )
}
