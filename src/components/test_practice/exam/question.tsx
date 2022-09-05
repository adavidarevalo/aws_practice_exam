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

export default function Question() {
    const {
        state,
        setState,
        questionLists,
    } = useContext(QuestionContext)

    const { actualQuestion, activeFlags } = state

    const { question, options, question_2, url } = useMemo<IQuestionData>(() => {
        return {
            ...(questionLists?.questions || [])[actualQuestion - 1][state.language],
            id: (questionLists?.questions || [])[actualQuestion - 1].id,
        } as IQuestionData
    }, [actualQuestion, state.language])

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
                    <span style={{ marginRight: "10px" }}>{actualQuestion}/{(questionLists?.questions || [] as IQuestion[]).length}</span>
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
                    <h3>{question}</h3>
                    {url && <img src={url} alt={actualQuestion.toString()} />}
                    {question_2 && <h3>{question_2}</h3>}
                    <Form style={{ marginTop: "30px" }}>
                        {options.map((option) => (
                            <Form.Field key={option.id as string}>
                                <Checkbox
                                    radio
                                    label={option.value}
                                    name='checkboxRadioGroup'
                                    value={option.id as string}
                                    checked={state.answers.find(({ questionId }) => questionId === actualQuestion.toString())?.solutionId.includes(option.id as string)}
                                    onClick={(e, { value }) => handleSelect(value as string)}
                                />
                            </Form.Field>
                        ))}
                    </Form>
                </div>
                <Button
                    icon
                    disabled={actualQuestion === (questionLists?.questions || [] as IQuestion[]).length}
                    onClick={handleNextQuestion}
                >
                    <Icon name='angle double right' />
                </Button>
            </div>
        </div>
    )
}
