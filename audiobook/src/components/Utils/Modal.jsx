import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GrNext } from "react-icons/gr";
import { FcNext } from "react-icons/fc";
import { MdNavigateNext } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";


const Modal = ({
    openModalHandler,
    closeModalHandler,
    book,
    chapter_number,
    sendData,
}) => {
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [focused, setFocused] = useState(true);
    const [upnext, setUpnext] = useState(false);
    const [nxtchapters, setNxtchapters] = useState([]);
    const inactivityTimeout = useRef(null);
    const [startX, setStartX] = useState();
 

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e) => {
        const endX = e.changedTouches[0].clientX;
        if (startX > endX + 100) {
            console.log("Swipe Left");

            if (chapter_number < book[0]["chapters"].length - 1) {
                sendData(chapter_number + 1);
            }
        }
        if (startX + 100 < endX) {
            console.log("Swipe Right");

            if (chapter_number > 1) {
                sendData(chapter_number - 1);
            }
        }
    };

    useEffect(() => {
        setNxtchapters(
            book[0]["chapters"].slice(
                chapter_number,
                book[0]["chapters"].length
            )
        );
    }, [chapter_number]);

    useEffect(() => {
        if (isFirstRender) {
            setTimeout(() => {
                setIsFirstRender(false);
            }, 800); // 500ms is the duration of the initial animation
        }
    }, [isFirstRender]);

    useEffect(() => {
        if (focused) {
            inactivityTimeout.current = setTimeout(() => {
                setFocused(false);
            }, 90000000); // 10 seconds of inactivity

            return () => clearTimeout(inactivityTimeout.current);
        }
    }, [focused]);

    useEffect(() => {
        const handleActivity = () => {
            if (!focused) {
                setFocused(true);
            }
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                // Your logic here

                closeModalHandler();
            }
        };

        window.addEventListener("mousemove", handleActivity);
        window.addEventListener("mousedown", handleActivity);
        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("mousemove", handleActivity);
            window.removeEventListener("mousedown", handleActivity);
            window.removeEventListener("keydown", handleEscape);
        };
    }, [focused]);
    let burl;

    const handleUpNext = () => {
        setUpnext((prev) => !prev);
    };

    if (window.innerWidth > 1024) {
        burl = book[0]["bookimg"];
    } else {
        burl = book[0]["bookimg"];
        // "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSfGnkT5jVZfCsLtlwy0cyCtE1qfD8ayT7Qtt8gUMSoLopicCWd";
    }

    const containerStyle = {
        backgroundImage: `url(${burl})`,
        opacity: 0.93, // Increase the opacity to make the background darker
        filter: "contrast(1.2) saturate(90%) brightness(25%)", // Decrease the brightness and adjust the contrast to make the text more visible
    };
    const mainstyle = {
        opacity: 1,
        filter: "contrast(1.0) saturate(100%) brightness(100%)",
    };

    const variants = {
        hidden: { x: "-100%" }, // Offscreen to the left
        visible: {
            x: isFirstRender && focused ? 0 : focused ? "-7%" : "15%",
            scale: isFirstRender && focused ? 1 : focused ? 0.75 : 1.25,
            y: isFirstRender && focused ? 0 : focused ? "4%" : "8%",
            transition: { duration: 0.5 },
        },
    };
    const variants2 = {
        hidden: { x: "-100%" }, // Offscreen to the right
        visible: {
            x: isFirstRender && focused ? 0 : focused ? "-5%" : "15%",
            scale: isFirstRender && focused ? 1 : focused ? 1.2 : 1.25,
            y: isFirstRender && focused ? 0 : focused ? "5%" : "8%",
            // y: isFirstRender && focused ? 0 : focused ? "7%" : "8%",
            transition: { duration: 0.5 },
        },
    };

    // Define the transition settings
    const transition = {
        type: "spring",
        damping: 20,
        stiffness: 100,
    };

    return (
        <div
            style={{
                position: "fixed",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
            }}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    initial={{ y: "50vh" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100vh" }}
                    transition={{ type: "tween", stiffness: 100 }}
                    className="-z-40 h-screen "
                >
                    <div
                        className=""
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div
                            className={`max-w-full bg-black h-screen ${
                                focused
                                    ? "-z-40 opacity-90"
                                    : "z-20 opacity-100"
                            } -z-40  w-full  text-white absolute top-0 bg-cover bg-center shadow-slate-950 shadow-2xl bg-no-repeat  `}
                            style={containerStyle}
                        >
                            <button
                                className="text-white float-right p-4 font-bold font-serif"
                                onClick={closeModalHandler}
                            >
                                X
                            </button>
                        </div>

                        

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={variants}
                            transition={transition}
                            className="hidden md:block lg:h-[60%] md:bottom-[35vh] md:w-[50%] md:left-[32%] absolute lg:bottom-20 h-[60%] bottom-[40vh] left-[23%] right-[25%] w-[70%] lg:w-[20%] lg:left-[2%] z-30"
                        >
                            <img
                                src={book[0]["bookimg"]}
                                className="h-[100%] bottom-12 md:bottom-[4.5rem]  absolute left-[3%]  w-[110%]  md:left-0 "
                                alt={book[0]["bookname"]}
                                style={mainstyle}
                            />
                        </motion.div>

                        <motion.div
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                            className="md:hidden absolute h-[50%] bottom-[40%] left-[18%]  w-[75%]  -z-20"
                            key={chapter_number}
                        >
                            <img
                                src={book[0]["bookimg"]}
                                className="h-[100%]  md:bottom-[4.5rem]  absolute  w-[85%]"
                                alt={book[0]["bookname"]}
                                style={mainstyle}
                            />
                        </motion.div>

                        <div
                            className="hidden cursor-pointer absolute top-[12vh] right-[1vw] text-gray-400    w-32 md:block"
                            onClick={handleUpNext}
                        >
                            <div className=" upNextScrollBar md:flex items-center gap-2 bg-gray-700 rounded-full py-3 px-2 pl-6 bg-opacity-30 hover:scale-110 duration-500 mb-4">
                                <div className=" ">Up Next</div>
                                <div className=" pt-1 ">
                                    {!upnext && (
                                        <span style={{ color: "#9CA3AF" }}>
                                            <MdNavigateNext size={18} />
                                        </span>
                                    )}
                                    {upnext && (
                                        <span style={{ color: "#9CA3AF" }}>
                                            <MdArrowDropDown size={18} />
                                        </span>
                                    )}
                                </div>
                            </div>

                            <AnimatePresence>
                                {upnext && (
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        exit={{
                                            x: "-100%",
                                            scale: 0,
                                            transition: { duration: 0.3 },
                                        }}
                                        variants={variants2}
                                        transition={transition}
                                        className=" h-[40vh] w-32 overflow-y-auto pr-3 z-[90]  mt-10 flex flex-col gap-3 relative"
                                    >
                                        {nxtchapters &&
                                            nxtchapters.map(
                                                (chapter, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="text-gray-400 text-sm flex w-full gap-2 hover:text-[0.9rem]  duration-300"
                                                            onClick={() => {
                                                                sendData(
                                                                    chapter.chapter_number
                                                                );
                                                            }}
                                                        >
                                                            <p>
                                                                {chapter.chapter_number}
                                                                .
                                                            </p>
                                                            <p>
                                                                {
                                                                    chapter.chapter_title
                                                                }
                                                            </p>
                                                        </div>
                                                    );
                                                }
                                            )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Modal;
