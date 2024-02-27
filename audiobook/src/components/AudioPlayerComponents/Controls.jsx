import { useState, useEffect, useCallback, useRef } from "react";

// icons
import {
    IoPlaySkipBackSharp,
    IoPlaySkipForwardSharp,
    IoPlaySharp,
    IoPauseSharp,
} from "react-icons/io5";

import { TbRewindBackward10  , TbRewindForward10} from "react-icons/tb";

import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from "react-icons/io";
import { BsArrowsFullscreen } from "react-icons/bs";
// import UseAnimations from "react-useanimations";



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
    setIsPlaying
}) => {
    // const [isPlaying, setIsPlaying] = useState(true);
    const [volumeval, setVolume] = useState(60);
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [muteVolume, setMuteVolume] = useState(false);

    const playAnimationRef = useRef();

    const imgurl = book[0]["bookimg"];

    useEffect(() => {
        if (audioRef) {
            audioRef.current.volume = volumeval / 100;
            audioRef.current.muted = muteVolume;
        }
    }, [volumeval, audioRef, muteVolume]);

    useEffect(() => {
        const audioElement = audioRef.current;

        const handleError = () => {
            setErrorOccurred(true);
            console.log("Wazzawi");
            const cpy = audioRef.current.currentTime;
            audioRef.current.load();
            audioRef.current.currentTime = cpy;
        };

        const handleStalled = () => {
            console.log(
                "Audio playback stalled. Check your network connection or the audio file."
            );
        };

        const handlePaused = () => {
            setIsPlaying(false);
            console.log("Paused");
        };
        const handlePlay = () => {
            setIsPlaying((prev) => true);
        };

        // const handleEnded = () => {
        //     console.log("Ended");
        // };

        // Add event listeners to the audio element
        audioElement.addEventListener("error", handleError);
        audioElement.addEventListener("stalled", handleStalled);
        audioElement.addEventListener("pause", handlePaused);
        audioElement.addEventListener("play", handlePlay);
        

        // Remove event listeners when the component unmounts
        return () => {
            audioElement.removeEventListener("error", handleError);
            audioElement.removeEventListener("stalled", handleStalled);
            audioElement.removeEventListener("pause", handlePaused);
            audioElement.removeEventListener("play", handlePlay);
        };
    }, []);




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

    useEffect(() => {
        const handleSpacebarPress = (event) => {
            switch (event.code) {
                case 'Space':
                    togglePlayPause();
                    break;
                case 'ArrowRight':
                    // Handle right arrow key press
                    handleforward10();
                    break;
                case 'ArrowLeft':
                    // Handle left arrow key press
                    handleback10();
                    break;
                default:
                    break;
            }
        };
    
        // Add event listener for the 'keydown' event
        document.addEventListener('keydown', handleSpacebarPress);
        
    
        // Remove event listener when the component unmounts
        return () => {
            document.removeEventListener('keydown', handleSpacebarPress);
        };
    }, [togglePlayPause]);


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
            localStorage.setItem(`${book[0].name}-${chapter_number}`, currentTime.toString());
        }
    }, [audioRef, duration, progressBarRef, setTimeProgress]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play().catch(() => {
                console.log("Wazza");
                const cpy = audioRef.current.currentTime;
                audioRef.current.load();
                audioRef.current.currentTime = cpy;
                // progressBarRef.current.value = currentTime;
            });
        } else {
            audioRef.current.pause();
            console.log("check")
        }
        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [isPlaying, audioRef, repeat]);





    navigator.mediaSession.setActionHandler("previoustrack", function () {
        handleprev();
    });

    navigator.mediaSession.setActionHandler("nexttrack", function () {
        handlenext();
    });


    


    return (
        <div className="controls-wrapper">
            <div className={`controls md:flex justify-between px-6 ${openModal && "text-3xl md:pb-2 pb-12"}`}>
                <div className="md:flex-[15%] hidden md:flex  self-center">

                    <select
                        className={`bg-transparent text-black  block ${openModal ? "md:hidden" : "md:block"} dark:placeholder-opacity-50 dark:ring-1 dark:ring-black ring-1 ring-gray-800 font-semibold font-sans rounded-lg pl-2  w-[42%] md:ml-8 mb-1`}
                        onChange={(e) => {
                            audioRef.current.playbackRate = e.target.value;
                        }}

                        defaultValue={1}
                    >
                        <option value="0.25">0.25x</option>
                        <option value="0.5">0.5x</option>
                        <option value="0.75">0.75x</option>
                        <option value="1" >1x</option>
                        <option value="1.25">1.25x</option>
                        <option value="1.5">1.5x</option>
                        <option value="1.75">1.75x</option>
                        <option value="2">2x</option>
                        </select>
   
                </div>

                <div className="md:flex-[70%] self-center text-center pl-2 gap-10">
                    <button className={`px-2 ${openModal && "text-gray-1f00"}`} onClick={handleprev}>
                        <IoPlaySkipBackSharp />
                    </button>
                    <button className={`px-2 ${openModal && "text-gray-400"}`} onClick={handleback10}>
                    <TbRewindBackward10/>
                    </button>

                    <button onClick={togglePlayPause} className="px-2">
                        {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
                    </button>
                    <button className={`px-2 ${openModal && "text-gray-400"}`} onClick={handleforward10}>
                        
                    
                    <TbRewindForward10/>
                        
                    </button>
                    <button className={`px-2 ${openModal && "text-gray-100"}`} onClick={handlenext}>
                        <IoPlaySkipForwardSharp />
                    </button>
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

                    <div className={`pb-2 self-center hidden md:block ${openModal &&"pb-[18px]"}`}>
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

                    <div className="md:self-center pl-3 absolute left-0 bottom-[67px] md:hidden ">
                    <select
                        className={`bg-transparent  text-md block ${openModal ? "md:hidden text-white" : "md:block"}   font-sans rounded-lg  py-1 w-[80%] bottom-5  ${openModal ? "text-2xl mb-7" : "text-sm"}   `}
                        onChange={(e) => {
                            audioRef.current.playbackRate = e.target.value;
                        }}

                        defaultValue={1}
                    >
                        <option value="0.25">0.25x</option>
                        <option value="0.5">0.5x</option>
                        <option value="0.75">0.75x</option>
                        <option value="1" >1x</option>
                        <option value="1.25">1.25x</option>
                        <option value="1.5">1.5x</option>
                        <option value="1.75">1.75x</option>
                        <option value="2">2x</option>
                    </select>
                    </div>
                    <div className="md:self-center pl-4 left-0">
                        <BsArrowsFullscreen
                            onClick={openModalHandler}
                            className={`${openModal ? "text-2xl" : ""}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Controls;
