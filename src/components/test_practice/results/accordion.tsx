import React, { useContext } from 'react'
import { Accordion } from 'semantic-ui-react'
import { QuestionContext } from '../../context/question'
import { IAnswer } from '../../utils/axios'
import AccordionItem from './accordion_item'

interface IProps {
    answerValidated: IAnswer[]
}

export default function AccordionLists({ answerValidated }: IProps) {
    const {
        questionLists,
    } = useContext(QuestionContext)

    return (
        <Accordion fluid styled style={{ width: "90%" }}>
            {questionLists?.questions.map(question => (
                <AccordionItem
                    question={question}
                    answerValidated={answerValidated}
                />
            ))}
        </Accordion>
    )
}
