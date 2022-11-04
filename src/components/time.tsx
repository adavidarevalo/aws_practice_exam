import React, { useContext } from 'react'
// import { useStopwatch } from "react-timer-hook";
import { useTimer } from "react-timer-hook";
import { QuestionContext } from './context/question';

export default function TimeClock() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 7800);

    const {
        setState
    } = useContext(QuestionContext)

    const handleFinishExam = () => {
        setState(prevState => ({
            ...prevState,
            isFinishExam: true
        }))
    }

    const {
        seconds,
        minutes,
        hours
    } = useTimer({
        expiryTimestamp: time,
        onExpire: handleFinishExam
    });

    const hourTime = hours < 10 ? `0${hours}` : `${hours}`;
    const minuteTime = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondTime = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return (
        <div
            style={{
                width: 100,
                textAlign: "end"
            }}
        >
            <span>{hourTime}</span>:<span>{minuteTime}</span>:
            <span>{secondTime}</span>
        </div>
    );
}
