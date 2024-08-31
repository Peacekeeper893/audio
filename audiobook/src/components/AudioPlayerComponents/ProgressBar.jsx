import React from "react";
import { MdOutlineExpandLess } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

import { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import Bookmarks from "../Utils/Bookmarks";

const ProgressBar = ({
    progressBarRef,
    audioRef,
    timeProgress,
    duration,
    openModal,
    book,
    playBookmark,
}) => {
    const [bookmarkDisplay, setBookmarkDisplay] = useState(false);

    const bookmarkBarVariants = {
        hidden: { y: "100%" },
        visible: { y: "0%" },
        exit: { y: "100%" }, // Add opacity: 0 to make the exit animation visible
    };

    const handleProgressChange = () => {
        try {
            audioRef.current.currentTime = progressBarRef.current.value;
        } catch (error) {
            audioRef.current.currentTime = 0;
            console.log("sorted");
        }
    };

    const handleBookmarkDisplay = () => {
        setBookmarkDisplay((prev) => !prev);
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
        <div className={`pb-4 md:pb-2 ${openModal && "md:pb-4"}`}>
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

            {openModal && (
                <div
                    className="hidden md:block text-[1rem] font-normal md:absolute  md:bottom-1 bottom-[11vh] w-full pl-2  md:pl-5  hover:pb-[0.08rem] cursor-pointer duration-300"
                    onClick={handleBookmarkDisplay}
                >
                    <div className="flex justify-center">
                        <div className="flex items-center gap-2">
                            <span>Your Bookmarks</span>
                            <span className="pt-1">
                                <MdOutlineExpandLess />
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <AnimatePresence>
                {openModal && bookmarkDisplay && (
                    <motion.div
                        className="bookmark-bar absolute bottom-0 rounded-t-2xl  bg-neutral-200 bg-opacity-100 text-black z-[80] w-full px-4 pb-8 max-h-[55vh] text-xl overflow-y-auto  "
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={bookmarkBarVariants}
                        transition={{ type: "tween", stiffness: 110 }}
                    >
                        {/* Your bookmarks go here */}

                        <div className="flex justify-between sticky top-0 mb-4 py-4 z-[50] bg-neutral-200 ">
                            <div></div>

                            <div
                                className="flex justify-center items-center gap-3 cursor-pointer"
                                onClick={handleBookmarkDisplay}
                            >
                                <div>Your Bookmarks</div>
                                <div className="pt-1">
                                    <IoIosArrowDown />
                                </div>
                            </div>
                            <button
                                onClick={handleBookmarkDisplay}
                                className="hover:text-[1.3rem] duration-500"
                            >
                                <IoCloseSharp />
                            </button>
                        </div>

                        <Bookmarks book={book} playBookmark={playBookmark} />

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProgressBar;
