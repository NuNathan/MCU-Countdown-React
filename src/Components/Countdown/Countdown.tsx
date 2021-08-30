import React, { useEffect, useState } from 'react';
    
interface ICountdown {
    premiere: string;
    callbackSec: ()=> void;
}

const Countdown = ({premiere, callbackSec }: ICountdown) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(premiere) - +new Date();
        let timeLeft: any = {};
    
        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        }
    
        return timeLeft;
      };
    
      const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    
      useEffect(() => {
        setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
      });
    
      const timerComponents: any = [];
      
      Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
          return;
        }
        timerComponents.push(
          <span key={"Key="+interval}>
            {timeLeft[interval]}{interval.charAt(0)}{" "}
          </span>
        );
      });
      callbackSec();
    return (
        <div className="countdownContainer">
            <div className="countdown" style={{ margin: 0 }}>Release in: {timerComponents.length ? timerComponents : <span>NOW!</span>}</div>
        </div>
    );
};

export default Countdown;
