import React from "react";

const ProgressBar = ({ progressBarRef, audioRef, timeProgress, duration }) => {
    const handleProgressChange = () => {
        try {
            audioRef.current.currentTime = progressBarRef.current.value;
        } catch (error) {
            audioRef.current.currentTime = 0;
            console.log("sorted");
        }
    };

    const formatTime = (time) => {
        if (time && !isNaN(time)) {
            const minutes = Math.floor(time / 60);
            const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
            const seconds = Math.floor(time % 60);
            const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${formatMinutes}:${formatSeconds}`;
        }
        return "00:00";
    };
    return (
        <div className="pb-4 md:pb-2">
            <input
                type="range"
                ref={progressBarRef}
                defaultValue="0"
                onChange={handleProgressChange}
            />
            <div className="flex justify-between ">
                <div className="time current relative left-[5%] ">
                    {formatTime(timeProgress)}
                </div>
                <div className="relative right-[5%] ">
                    {formatTime(duration)}
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
