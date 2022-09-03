import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

export default function ConfettiParty() {
    const [confettiCounter, setConfettiCounter] = useState<number>(9);

    const counter = () => {
        let counter = setInterval(() => {
            setConfettiCounter((time) => {
                if (time === 0) {
                    clearInterval(counter);
                    return 0;
                } else return time - 1;
            });
        }, 1000);
    }

    useEffect(() => {
        setTimeout(() => counter(), 3000);
    }, []);

    return (
        <>
            <Confetti
                opacity={Number(`0.${confettiCounter}`)}
                width={window.innerWidth}
                height={window.innerHeight}
            />
        </>
    )
}
