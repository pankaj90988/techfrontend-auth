import React, { useEffect, useState } from 'react'

const Timer = ({initialTime,setinitialTime}) => {

    const [timeleft, setTimeLeft] = useState(initialTime);
    useEffect(() => {
        if (timeleft <= 0) {
            setinitialTime(timeleft)
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return (() => {
            clearInterval(timer)
        })
    }, [timeleft]);

    // convert timeleft in seconds and minutes
    const formatTime = () => {
        const minutes = Math.floor(timeleft / 60);
        const seconds = timeleft % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };


    return (
        <>
            <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '5px' }}>
                <span style={{ color: '#64748b', fontSize: '16px' }}>Code expires in: </span>
                <span style={{
                    color: timeleft < 60 ? '#ef4444' : '#3b82f6',
                    fontWeight: 'bold',
                    fontSize: '16px'
                }}>
                    {formatTime()}
                </span>
            </div>
        </>
    )
}

export default Timer