import React, { useContext, useMemo, useState } from 'react'
import { Accordion, Icon, Label, List } from 'semantic-ui-react'
import { IQuestion, QuestionContext } from '../../context/question';
import { IAnswer } from '../../utils/axios';

interface IProps {
    question: {
        id: string;
        en: IQuestion;
        es: IQuestion
    };
    answerValidated: IAnswer[]
}

export default function AccordionItem({ question, answerValidated }: IProps) {
    const [isOpen, setIsOpen] = useState(false)
    const {
        state
    } = useContext(QuestionContext)

    const result = useMemo<IAnswer>((): IAnswer => {
        return answerValidated.find(answer => answer.questionId === question.id) as IAnswer
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
                >{question[state.language].question}</h3>
                <Label>
                    {result.isCorrectAnswer && (
                        <>
                            <Icon name='check circle' color='green' /> Correct
                        </>
                    )}
                    {result.isCorrectAnswer === false && (
                        <>
                            <Icon name='circle' color='red' /> Incorrect
                        </>
                    )}
                    {result.isCorrectAnswer === null && (
                        <>
                            <Icon name='minus circle' color='grey' /> Omitted
                        </>
                    )}
                </Label>
            </Accordion.Title>
            <Accordion.Content active={isOpen}>
                <List bulleted>
                    {question[state.language].options.map((option) => (
                        <List.Item style={{
                            color: result.solutionId.includes(option.id as string) && "green"
                        }}>{option.value}</List.Item>
                    ))}
                </List>
            </Accordion.Content>
        </>
    )
}
