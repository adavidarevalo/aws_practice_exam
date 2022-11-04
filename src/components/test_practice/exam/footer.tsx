import React, { useContext, useEffect } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import usePressKey from '../../../hook/use_press_key'
import { QuestionContext } from '../../context/question'
import TimeClock from '../../time'

export default function Footer() {
    const {
        setState
    } = useContext(QuestionContext)

    const terminateExam = usePressKey('Escape')

    useEffect(() => {
        if (terminateExam) handleFinishExam()
    }, [terminateExam])


    const handleFinishExam = () => {
        setState(prevState => ({
            ...prevState,
            isFinishExam: true
        }))
    }

    return (
        <div
            style={{
                position: "absolute",
                bottom: "15px",
                right: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: "100%"
            }}
        >
            <Button
                icon
                labelPosition='right'
                onClick={handleFinishExam}
            >
                Terminar Examen
                <Icon name='sign-out' />
            </Button>
            <TimeClock />
        </div>
    )
}
