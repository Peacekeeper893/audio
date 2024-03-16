import { useState, useEffect, useCallback, useRef } from "react";

// icons
import {
    IoPlaySkipBackSharp,
    IoPlaySkipForwardSharp,
    IoPlaySharp,
    IoPauseSharp,
} from "react-icons/io5";

import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";
import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from "react-icons/io";
import { BsArrowsFullscreen } from "react-icons/bs";
import { GiContract } from "react-icons/gi";
import { LuPictureInPicture } from "react-icons/lu";

import { useNavigate } from "react-router-dom";

const Controls = ({
    audioRef,
    progressBarRef,
    duration,
    setTimeProgress,
    openModalHandler,
    sendData,
    chapter_number,
    book,
    openModal,
    isPlaying,
    setIsPlaying,
    setShowPlayer,
    isMiniPlayer,
}) => {
    // const [isPlaying, setIsPlaying] = useState(true);
    const [volumeval, setVolume] = useState(60);
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [muteVolume, setMuteVolume] = useState(false);
    const playAnimationRef = useRef();

    useEffect(() => {
        if (audioRef) {
            audioRef.current.volume = volumeval / 100;
            audioRef.current.muted = muteVolume;
        }
    }, [volumeval, audioRef, muteVolume]);

    // add event listeners for audio playback errors

    useEffect(() => {
        const audioElement = audioRef.current;

        const handleError = () => {
            setErrorOccurred(true);
            console.log("Audio Playback error");
        };

        const handleStalled = () => {
            console.log(
                "Audio playback stalled. Check your network connection or the audio file."
            );
        };

        const hanndleEnded = () => {
            if (chapter_number < book[0]["chapters"].length) {
                sendData(chapter_number + 1);
            }
        };

        // Add event listeners to the audio element
        audioElement.addEventListener("error", handleError);
        audioElement.addEventListener("stalled", handleStalled);
        audioElement.addEventListener("ended", hanndleEnded);

        // Remove event listeners when the component unmounts
        return () => {
            audioElement.removeEventListener("error", handleError);
            audioElement.removeEventListener("stalled", handleStalled);
            audioElement.removeEventListener("ended", hanndleEnded);
        };
    }, []);

    // handle buttons on the control bar

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };
    const handlenext = () => {
        sendData(chapter_number + 1);
    };
    const handleprev = () => {
        sendData(chapter_number - 1);
    };

    const handleback10 = () => {
        audioRef.current.currentTime -= 10;
    };
    const handleforward10 = () => {
        audioRef.current.currentTime += 10;
    };

    // add event listener for keyboard shortcuts

    useEffect(() => {
        const handleKeyPress = (event) => {
            switch (event.code) {
                case "Space":
                    togglePlayPause();
                    break;
                case "ArrowRight":
                    // Handle right arrow key press
                    handleforward10();
                    break;
                case "ArrowLeft":
                    // Handle left arrow key press
                    handleback10();
                    break;
                default:
                    break;
            }
        };

        // Add event listener for the 'keydown' event
        document.addEventListener("keydown", handleKeyPress);

        // Remove event listener when the component unmounts
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    // add action handlers for media shortcut

    navigator.mediaSession.setActionHandler("previoustrack", function () {
        handleprev();
    });

    navigator.mediaSession.setActionHandler("nexttrack", function () {
        handlenext();
    });

    navigator.mediaSession.setActionHandler("play", function () {
        setIsPlaying((prev) => true);
    });

    navigator.mediaSession.setActionHandler("pause", function () {
        setIsPlaying(false);
        console.log("Paused");
    });

    // repeat function to update the progress bar

    let currentTime;

    const repeat = useCallback(() => {
        try {
            currentTime = audioRef.current.currentTime;
            setTimeProgress(currentTime);
            progressBarRef.current.value = currentTime;
            progressBarRef.current.style.setProperty(
                "--range-progress",
                `${(progressBarRef.current.value / duration) * 100}%`
            );

            playAnimationRef.current = requestAnimationFrame(repeat);
        } catch (error) {
            console.log("Error");
            localStorage.setItem(
                `${book[0].name}-${chapter_number}`,
                currentTime.toString()
            );
        }
    }, [audioRef, duration, progressBarRef, setTimeProgress]);

    // Play and Pause the audio synced with the state

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play().catch(() => {
                console.log("Error in playing audio.");
            });
        } else {
            audioRef.current.pause();
            console.log("Playback Paused");
        }
        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [isPlaying, audioRef, repeat]);

    const handlePiP = () => {
        // sendData(0);

        setShowPlayer(false);
        const turl = `/miniplayer/${book[0].name}?ch=${chapter_number}&time=${audioRef.current.currentTime}`;
        const newWindow = window.open(turl, "_blank", "width=500,height=1024");

        const checkWindowClosed = setInterval(() => {
            if (newWindow.closed) {
                setShowPlayer(true);

              clearInterval(checkWindowClosed);
            }
        }, 1800);
        

        
    };

    return (
        <div className="controls-wrapper">
            <div
                className={`controls md:flex justify-between px-6 ${
                    openModal && "text-3xl md:pb-0 md:-mb-5 pb-4 "
                }`}
            >
                <div className="md:flex-[15%] hidden md:flex  self-center">
                    <select
                        className={`bg-transparent text-black cursor-pointer  block ${
                            openModal
                                ? "md:block text-gray-600 ring-gray-600 dark:ring-gray-600 text-2xl w-[55%]"
                                : "md:block"
                        } dark:placeholder-opacity-50 dark:ring-1 dark:ring-black ring-1 ring-gray-800 font-semibold font-sans rounded-lg pl-2  w-[45%] md:ml-8 mb-1`}
                        onChange={(e) => {
                            audioRef.current.playbackRate = e.target.value;
                        }}
                        defaultValue={1}
                    >
                        <option value="0.25">0.25x</option>
                        <option value="0.5">0.50x</option>
                        <option value="0.75">0.75x</option>
                        <option value="1">1.00x</option>
                        <option value="1.25">1.25x</option>
                        <option value="1.5">1.50x</option>
                        <option value="1.75">1.75x</option>
                        <option value="2">2.00x</option>
                    </select>
                </div>

                <div className="md:flex-[70%] self-center text-center pl-2 gap-10 ">
                    {!isMiniPlayer && (
                        <button
                            className={`px-2 hover:scale-110 ${
                                openModal && "text-gray-100"
                            }`}
                            onClick={handleprev}
                        >
                            <IoPlaySkipBackSharp />
                        </button>
                    )}
                    <button
                        className={`px-2 hover:scale-110 ${
                            openModal && "text-gray-400"
                        }`}
                        onClick={handleback10}
                    >
                        <TbRewindBackward10 />
                    </button>

                    <button
                        onClick={togglePlayPause}
                        className="px-2 hover:scale-110"
                    >
                        {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
                    </button>
                    <button
                        className={`px-2 hover:scale-110 ${
                            openModal && "text-gray-400"
                        }`}
                        onClick={handleforward10}
                    >
                        <TbRewindForward10 />
                    </button>
                    {!isMiniPlayer && (
                        <button
                            className={`px-2 hover:scale-110 ${
                                openModal && "text-gray-100"
                            }`}
                            onClick={handlenext}
                        >
                            <IoPlaySkipForwardSharp />
                        </button>
                    )}
                </div>

                <div className="volume flex-[15%] flex gap-2  flex-nowrap float-right">
                    <button
                        onClick={() => setMuteVolume((prev) => !prev)}
                        className="hidden md:block"
                    >
                        {muteVolume || volumeval < 5 ? (
                            <IoMdVolumeOff />
                        ) : volumeval < 40 ? (
                            <IoMdVolumeLow />
                        ) : (
                            <IoMdVolumeHigh />
                        )}
                    </button>

                    <div
                        className={`pb-2 self-center hidden md:block ${
                            openModal && "pb-[18px]"
                        }`}
                    >
                        <input
                            type="range"
                            min={0}
                            max={100}
                            id="vol-control"
                            value={volumeval}
                            onChange={(e) => setVolume(e.target.value)}
                            style={{
                                background: `linear-gradient(to right, #f50 ${volumeval}%, #ccc ${volumeval}%)`,
                                paddingBottom: "6px",
                            }}
                        />
                    </div>


                    <div className="md:self-center pl-4 left-0 cursor-pointer md:content-center hover:scale-110">
                        {!openModal ? (
                            <BsArrowsFullscreen
                                onClick={openModalHandler}
                                className={`${
                                    openModal ? "text-2xl" : "text-lg"
                                }`}
                            />
                        ) : (
                            <GiContract
                                onClick={openModalHandler}
                                className={`${
                                    openModal ? "text-2xl" : "text-lg"
                                } hidden md:block`}
                            />
                        )}
                    </div>

                    {!openModal && <div
                        className="md:self-center pl-2 cursor-pointer md:content-center hover:scale-110 hidden lg:block"
                        onClick={handlePiP}
                    >
                        <div >
                            <LuPictureInPicture className="text-2xl font-thin" size={28} strokeWidth={1}/>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Controls;
