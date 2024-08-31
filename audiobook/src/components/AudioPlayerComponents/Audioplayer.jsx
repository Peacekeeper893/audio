import React, { Fragment, useRef, useState, useEffect } from "react";
import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import { Timestamp } from "firebase/firestore";

const Audioplayer = ({
    currentTrack,
    openModalHandler,
    closeModalHandler,
    sendData,
    chapter_number,
    book,
    openModal,
    audioRef,
    isMiniPlayer,
    time,
    setShowPlayer,
}) => {
    // const audioRef = useRef();
    const progressBarRef = useRef();
    const [isPlaying, setIsPlaying] = useState(true);

    const [open, setOpen] = useState(false);
    const [storedTime, setStoredTime] = useState(null);

    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${
            remainingSeconds < 10 ? "0" : ""
        }${remainingSeconds}`;
    };

    useEffect(() => {
        const data = localStorage.getItem(
            book[0]["name"] + "-" + chapter_number
        );

        if (data && audioRef.current.currentTime === 0) {
            setStoredTime(data);
            setOpen(true);
            localStorage.removeItem(book[0]["name"] + "-" + chapter_number);
        }
    }, [book, chapter_number, audioRef]);

    const handleClose = (shouldContinue) => {
        setOpen(false);
        if (shouldContinue && storedTime) {
            audioRef.current.currentTime = parseFloat(storedTime);
        }
    };

    useEffect(() => {


        if (isMiniPlayer && audioRef && audioRef.current) {
            audioRef.current.currentTime = time;
        }
        
    }, [time, isMiniPlayer]);

    const playBookmark = (chapter, timestamp) =>{
        
        sendData(chapter);

        setTimeout(() => {
            audioRef.current.currentTime = timestamp;
            setIsPlaying(true);
        }, 500);
    }
    
    

    return (
        <Fragment>
            {/*continue playback modal*/}

            {open && !isMiniPlayer &&  (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3
                                            className="text-lg leading-6 font-medium text-gray-900"
                                            id="modal-title"
                                        >
                                            Continue Playback?
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Do you want to continue from{" "}
                                                {formatTime(
                                                    parseFloat(storedTime)
                                                )}
                                                ?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => handleClose(true)}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                    onClick={() => handleClose(false)}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className={`${openModal && "bg-d-bg-100 bg-opacity-70 rounded-t-[2rem] pt-4"}`}>
                <DisplayTrack
                    currentTrack={currentTrack}
                    audioRef={audioRef}
                    setDuration={setDuration}
                    progressBarRef={progressBarRef}
                    book={book}
                    chapter_number={chapter_number}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                />
                <Controls
                    {...{
                        audioRef,
                        progressBarRef,
                        duration,
                        setTimeProgress,
                        openModalHandler,
                        closeModalHandler,
                        sendData,
                        chapter_number,
                        book,
                        openModal,
                        isPlaying,
                        setIsPlaying,
                        setShowPlayer,
                        isMiniPlayer,
                    }}
                />
                <ProgressBar
                    progressBarRef={progressBarRef}
                    audioRef={audioRef}
                    timeProgress={timeProgress}
                    duration={duration}
                    openModal={openModal}
                    book={book}
                    playBookmark={playBookmark}
                />
            </div>
        </Fragment>
    );
};

export default Audioplayer;
