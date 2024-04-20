import React from "react";
import { Fragment, useRef, useState } from "react";
import Audioplayer from "../AudioPlayerComponents/Audioplayer";
import { FaHouseChimneyWindow } from "react-icons/fa6";
import { GiContract } from "react-icons/gi";
import { TbBooks } from "react-icons/tb";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdBookmarks } from "react-icons/io";
import { CiBookmarkPlus } from "react-icons/ci";

import { motion, AnimatePresence } from "framer-motion";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Bookmark from "../Utils/Bookmark";
import Bookmarks from "../Utils/Bookmarks";
import MobileChapterList from "../Utils/MobileChapterList";

const Chapter = ({
    title,
    url,
    openModalHandler,
    closeModalHandler,
    openModal,
    book,
    chapter_number,
    sendData,
    isMiniPlayer,
    time,
    setShowPlayer,
}) => {
    const name = book[0]["name"];
    console.log(chapter_number);

    const auth = getAuth();
    const user = auth.currentUser;

    const [bookmarkDisplay, setBookmarkDisplay] = useState(false);
    const [chapterDisplay, setChapterDisplay] = useState(false);

    const ARef = useRef();

    const bookmarkBarVariants = {
        hidden: { y: "100%" },
        visible: { y: "0%" },
        exit: { y: "100%" }, // Add opacity: 0 to make the exit animation visible
    };

    const handleBookmarkDisplay = () => {
        setBookmarkDisplay((prev) => !prev);
    };

    const handleChapterDisplay = () => {
        setChapterDisplay((prev) => !prev);
    };

    const playBookmark = (chapter, timestamp) => {
        sendData(chapter);

        setTimeout(() => {
            ARef.current.currentTime = timestamp;
            // setIsPlaying(true);
        }, 500);
    };

    const notify = (message) => toast(message);

    const handleAddBookmark = async () => {
        if (user && user.uid && book && ARef.current) {
            addDoc(collection(db, "users", user.uid, "bookmarks"), {
                name: book[0]["name"],
                chapter_number: chapter_number,
                timestamp: ARef.current.currentTime,
                setAt: serverTimestamp(),
            })
                .then(() => {
                    console.log("Document successfully written!");
                    window.alert("Bookmark added successfully");
                    notify("Bookmark Added");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        } else {
            console.log("Error in adding bookmark");
        }
    };

    return (
        <Fragment>
            <div
                className={`${
                    openModal && "bg-transparent bottom-0 text-2xl md:text-4xl "
                } ${
                    !openModal &&
                    "bg-gradient-to-r from-stone-400 via-stone-200 to-stone-400 text-xl dark:bg-gradient-to-tr dark:from-neutral-500 dark:via-violet-600 dark:to-slate-500"
                }    rounded-t-2xl `}
            >
                <p
                    className={`${
                        openModal &&
                        "bg-transparent bottom-2 text-2xl md:text-4xl lg:text-6xl font-sans text-[#ececec] md:mb-4 mb-2 lg:px-72 lg:mx-8 text-center py-2"
                    } ${
                        !openModal && "text-2xl font-semibold pl-5 py-3"
                    }  text-center`}
                >
                    {book[0]["chapterdetails"]
                        ? title
                        : `${name} - Chapter ${chapter_number}`}{" "}
                </p>
                <Audioplayer
                    currentTrack={url}
                    openModalHandler={openModalHandler}
                    closeModalHandler={closeModalHandler}
                    sendData={sendData}
                    chapter_number={chapter_number}
                    book={book}
                    openModal={openModal}
                    audioRef={ARef}
                    isMiniPlayer={isMiniPlayer}
                    time={time}
                    setShowPlayer={setShowPlayer}
                />

                {openModal && (
                    <div className=" md:hidden w-full h-12  flex  bg-d-bg-100 bg-opacity-70">
                        <div className="w-[25%]  h-full  flex items-center justify-center p-4">
                            <select
                                className="bg-transparent text-white p-1 font-eczar w-[90%] "
                                onChange={(e) => {
                                    ARef.current.playbackRate = e.target.value;
                                }}
                                defaultValue={1}
                            >
                                <option value="0.25">0.25x</option>
                                <option value="0.5">0.5x</option>
                                <option value="0.75">0.75x</option>
                                <option value="1">1x</option>
                                <option value="1.25">1.25x</option>
                                <option value="1.5">1.5x</option>
                                <option value="1.75">1.75x</option>
                                <option value="2">2x</option>
                            </select>
                        </div>
                        <div className="w-[25%]  h-full  flex items-center justify-center">
                            <IoMdBookmarks
                                size={32}
                                onClick={handleBookmarkDisplay}
                            />
                        </div>
                        <div className="w-[25%]  h-full  flex items-center justify-center">
                            <TbBooks size={32} onClick={handleChapterDisplay} />
                        </div>
                        <div className="w-[25%]  h-full  flex items-center justify-center hover:scale-90">
                            <GiContract size={32} onClick={openModalHandler} />
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Bookmark List */}

            <AnimatePresence>
                {openModal && bookmarkDisplay && (
                    <motion.div
                        className="bookmark-bar absolute bottom-0 rounded-t-2xl  bg-neutral-200 bg-opacity-100 text-black z-40 w-full px-4 md:pb-8 pb-2 max-h-[60vh] min-h-[40vh] text-xl overflow-y-auto  "
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={bookmarkBarVariants}
                        transition={{ type: "tween", stiffness: 110 }}
                    >
                        {/* Your bookmarks go here */}

                        <div className="flex flex-col justify-between   max-h-[60vh] min-h-[40vh]">
                            <div>
                                <div className="flex justify-center sticky top-0 mb-4 py-4 z-[50] bg-neutral-200 ">
                                    

                                    <div
                                        className="flex justify-center items-center gap-3 cursor-pointer"
                                        onClick={handleBookmarkDisplay}
                                    >
                                        <div>Your Bookmarks</div>
                                        <div className="pt-1">
                                            <IoIosArrowDown />
                                        </div>
                                    </div>

                                </div>

                                <Bookmarks
                                    book={book}
                                    playBookmark={playBookmark}
                                />
                            </div>

                            <div className="text-center flex justify-center gap-2 items-center mt-8" onClick={handleAddBookmark}>
                                <p className="text-lg font-medium">Add Bookmark</p>
                                <CiBookmarkPlus size={24} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Chapter List */}
            <AnimatePresence>
                {openModal && chapterDisplay && (
                    <motion.div
                        className="bookmark-bar absolute bottom-0 rounded-t-2xl  bg-neutral-200 bg-opacity-100 text-black z-40 w-full px-4 pb-8 max-h-[90vh] min-h-[90vh] text-xl overflow-y-auto dark:bg-d-bg-200 dark:text-white "
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={bookmarkBarVariants}
                        transition={{ type: "tween", stiffness: 110 }}
                    >
                        {/* Your bookmarks go here */}

                        <div className="flex justify-between sticky top-0 mb-4 py-4 z-[50] bg-neutral-200 dark:bg-d-bg-200 dark:text-white  ">
                            <div></div>

                            <div
                                className="flex justify-center items-center gap-3 cursor-pointer"
                                onClick={handleChapterDisplay}
                            >
                                <div>Chapters</div>
                                <div className="pt-1">
                                    <IoIosArrowDown />
                                </div>
                            </div>
                            <button
                                onClick={handleChapterDisplay}
                                className="hover:text-[1.3rem] duration-500"
                            >
                                <IoCloseSharp />
                            </button>
                        </div>

                        <MobileChapterList
                            book={book}
                            chapter_number={chapter_number}
                            sendData={sendData}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </Fragment>
    );
};

export default Chapter;
