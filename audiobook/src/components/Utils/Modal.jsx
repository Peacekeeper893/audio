import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GrNext } from "react-icons/gr";
import { FcNext } from "react-icons/fc";
import { MdNavigateNext } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";

const Modal = ({ openModalHandler, closeModalHandler, book,chapter_number,sendData }) => {
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [focused, setFocused] = useState(true);
    const [upnext, setUpnext] = useState(false);
    const [nxtchapters, setNxtchapters] = useState([]);
    const inactivityTimeout = useRef(null);

    // console.log(focused);

    useEffect(() => {

        setNxtchapters(book[0]["chapters"].slice(chapter_number, chapter_number + 4 > book[0]["chapters"].length ? book[0]["chapters"].length : chapter_number + 4));
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

        window.addEventListener("mousemove", handleActivity);
        window.addEventListener("mousedown", handleActivity);

        return () => {
            window.removeEventListener("mousemove", handleActivity);
            window.removeEventListener("mousedown", handleActivity);
        };
    }, [focused]);
    let burl;

    const handleUpNext = () => {
        setUpnext((prev) => !prev);
    };

    if (window.innerWidth > 1024) {
        burl = book[0]["bookimg"];
    } else {
        burl =
            "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSfGnkT5jVZfCsLtlwy0cyCtE1qfD8ayT7Qtt8gUMSoLopicCWd";
    }

    const containerStyle = {
        backgroundImage: `url(${burl})`,
        // opacity: 0.9, // Increase the opacity to make the background darker
        filter: "contrast(1.2) saturate(90%) brightness(25%)", // Decrease the brightness and adjust the contrast to make the text more visible
    };
    const mainstyle = {
        opacity: 1,
        filter: "contrast(1.0) saturate(100%) brightness(100%)",
    };

    const variants = {
        hidden: { x: "-100%" }, // Offscreen to the left
        visible: {
            x: isFirstRender && focused ? 0 : focused ? "-10%" : "15%",
            scale: isFirstRender && focused ? 1 : focused ? 0.75 : 1.25,
            y: isFirstRender && focused ? 0 : focused ? "7%" : "8%",
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
        <div>
            <div
                className={`max-w-full bg-black h-screen ${
                    focused ? "-z-40 opacity-90" : "z-20 opacity-100"
                } -z-40  w-full  text-white absolute top-0 bg-cover bg-center shadow-slate-950 shadow-2xl bg-no-repeat `}
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

            <div className="md:hidden  absolute  h-[50%] bottom-[38vh] left-[10%]  w-[75%]  z-30">
                <img
                    src={book[0]["bookimg"]}
                    className="h-[100%] bottom-12 md:bottom-[4.5rem]  absolute left-[3%]  w-[100%]   "
                    alt={book[0]["bookname"]}
                    style={mainstyle}
                />
            </div>

            <div
                className="hidden cursor-pointer absolute top-[12vh] right-[1vw] text-gray-400  bg-transparent bg-opacity-30 w-32 md:block"
                onClick={handleUpNext}
            >
                <div className="md:flex items-center gap-2">
                    <div className="underline underline-offset-8">Up Next</div>
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
                {upnext && <div className=" h-24 w-32  mt-6 flex flex-col gap-3">

                    {nxtchapters && nxtchapters.map((chapter, index) => {

                        return (
                            <div key={index} className="text-gray-400 text-sm flex w-full gap-2 hover:scale-105 duration-300" onClick={() => { sendData(chapter.chapter_number) }}>

                            <p>  {chapter.chapter_number}.</p> 
                            <p>    {chapter.chapter_title}</p>

                                
                                
                                
                            </div>
                        );

                    })}
                    
                
                </div>}
            </div>
        </div>
    );
};

export default Modal;
