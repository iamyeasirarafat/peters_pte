import { useState, useEffect } from "react";

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const targetTime = new Date(targetDate).getTime();
    const difference = targetTime - now;
    if (difference < 0) {
      return {
        timeOver: "Exam date is over",
      };
    }
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);
  return (
    <div className="flex items-center gap-x-2">
      {timeLeft?.timeOver ? (
        timeLeft?.timeOver
      ) : (
        <>
          <div>{timeLeft.days}d</div>
          <div>{timeLeft.hours}h</div>
          <div>{timeLeft.minutes}m</div>
          <div>{timeLeft.seconds}s</div>
        </>
      )}
    </div>
  );
};

export default Countdown;
