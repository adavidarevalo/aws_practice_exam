import _ from 'lodash';
import React, { useContext, useMemo, useState } from 'react'
import { Accordion, Icon, Label, List } from 'semantic-ui-react'
import { IExam, IQuestion, QuestionContext } from '../../context/question';
import { IAnswer } from '../../utils/axios';

interface IProps {
    question: {
        id: string;
        en: IQuestion;
        es: IQuestion
    };
    answerValidated: IAnswer[]
}

export default function AccordionItem({ question }: { question: any }) {
    const [isOpen, setIsOpen] = useState(false)
    const {
        state
    } = useContext(QuestionContext)

    const { answers } = state

    const { isCorrectQuestion } = useMemo(() => {
        let isCorrectQuestion = null
        const q = answers.filter(({ questionId }) => Number(questionId) === question.id)
        if (q.length === 0) {
            isCorrectQuestion = null
        }
        if (q.length === 1) {
            isCorrectQuestion = !_.difference(q[0].solutionId.map(x => Number(x)), question.answers)
        }

        return {
            isCorrectQuestion
        }
    }, [])

    return (
        <>
            <Accordion.Title
                active={isOpen}
                index={0}
                onClick={() => setIsOpen(prevState => !prevState)}
                style={{ display: "flex", alignItems: "baseline" }}
            >
                <Icon name='dropdown' />
                <h3
                    style={{ width: "90%", margin: "0px" }}
                >{question[state.language].question1}</h3>
                <Label>
                    {isCorrectQuestion && (
                        <>
                            <Icon name='check circle' color='green' /> Correct
                        </>
                    )}
                    {isCorrectQuestion === false && (
                        <>
                            <Icon name='circle' color='red' /> Incorrect
                        </>
                    )}
                    {isCorrectQuestion === null && (
                        <>
                            <Icon name='minus circle' color='grey' /> Omitted
                        </>
                    )}
                </Label>
            </Accordion.Title>
            <Accordion.Content active={isOpen}>
                <List bulleted>
                    {question[state.language].options.map((option: {
                        id: number;
                        value: string
                    }) => (
                        <List.Item
                            key={option.id}
                            style={{
                                color: question.answers.includes(option.id) && "green"
                            }}
                        >{option.value}</List.Item>
                    ))}
                </List>
            </Accordion.Content>
        </>
    )
}
