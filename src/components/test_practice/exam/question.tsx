import { useContext, useEffect, useMemo, useState } from 'react'
import { Button, Checkbox, Form, Icon, Popup } from 'semantic-ui-react'
import _ from "lodash"
import { IQuestion, IState, QuestionContext } from '../../context/question'
import ChangeLanguageButton from '../../change_language_button'
import usePressKey from '../../../hook/use_press_key'

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

    const [navigateOptionsArrow, setNavigateOptionsArrow] = useState(0)

    const { actualQuestion, activeFlags } = state

    const ArrowRight = usePressKey('ArrowRight')
    const ArrowLeft = usePressKey('ArrowLeft')
    const ArrowUp = usePressKey('ArrowUp')
    const ArrowDown = usePressKey('ArrowDown')
    const Space = usePressKey(' ')
    const favorite = usePressKey('f')

    useEffect(() => {
        if (ArrowRight) handleNextQuestion()
        if (ArrowLeft) handleBackQuestion()
        if (ArrowUp) handleChangeOption('up')
        if (ArrowDown) handleChangeOption('down')
        if (Space) selectOption()
        if (favorite) handleSaveFlag()
    }, [ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Space, favorite])

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

    const selectOption = () => {
        handleSelect(options[navigateOptionsArrow].id.toString())
    }


    const handleChangeOption = (opt: string) => {
        if (opt === "up" && navigateOptionsArrow === 0) return
        if (opt === "down" && navigateOptionsArrow === options.length - 1) return
        setNavigateOptionsArrow(prevState => {
            return opt === "up" ? prevState - 1 : prevState + 1
        })
    }

    const handleNextQuestion = () => {
        if (actualQuestion === examsList.length) return
        setState(prevState => ({
            ...prevState,
            actualQuestion: actualQuestion + 1
        }))
    }

    const handleBackQuestion = () => {
        if (actualQuestion === 1) return
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
                        {options.map((option, index) => (
                            <Form.Field
                                key={option.id}
                                style={{
                                    display: "flex",
                                    alignItems: "baseline"
                                }}
                            >
                                {navigateOptionsArrow === index && (
                                    <Icon color='green' size='tiny' name='circle' />
                                )}
                                <Checkbox
                                    radio
                                    label={option.value}
                                    name='checkboxRadioGroup'
                                    value={option.id.toString()}
                                    checked={!!state.answers.find(({ questionId }) => questionId === actualQuestion.toString())?.solutionId.includes(option.id.toString())}
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
