import React from 'react'
// import { useStopwatch } from "react-timer-hook";
import { useTimer } from "react-timer-hook";

export default function TimeClock() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 7800);
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart
    } = useTimer({
        expiryTimestamp: time,
        onExpire: () => console.warn("onExpire called")
    });

    const hourTime = hours < 10 ? `0${hours}` : `${hours}`;
    const secondTime = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const minuteTime = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return (
        <div>
            <span>{hourTime}</span>:<span>{minuteTime}</span>:
            <span>{secondTime}</span>
        </div>
    );
}
