import React, { useContext } from 'react'
import { Accordion } from 'semantic-ui-react'
import { QuestionContext } from '../../context/question'
import { IAnswer } from '../../utils/axios'
import AccordionItem from './accordion_item'


export default function AccordionLists() {
    const {
        examsList,
    } = useContext(QuestionContext)

    return (
        <Accordion fluid styled>
            {examsList.map(question => (
                <AccordionItem
                    question={question}
                />
            ))}
        </Accordion>
    )
}
