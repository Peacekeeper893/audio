import React from "react";
import { Fragment, useRef } from "react";
import Audioplayer from "../AudioPlayerComponents/Audioplayer";
import { FaHouseChimneyWindow } from "react-icons/fa6";
import { GiContract } from "react-icons/gi";

const Chapter = ({
    title,
    url,
    openModalHandler,
    openModal,
    book,
    chapter_number,
    sendData,
}) => {
    const name = book[0]["name"];
    console.log(chapter_number);

    const ARef = useRef();

    return (
        <Fragment>
            <div
                className={`${
                    openModal && "bg-transparent bottom-0 text-2xl md:text-4xl "
                } ${
                    !openModal &&
                    "bg-gradient-to-r from-stone-400 via-stone-200 to-stone-400 text-xl dark:bg-gradient-to-tr dark:from-neutral-500 dark:via-violet-600 dark:to-slate-500"
                }    rounded-t-2xl`}
            >
                <p
                    className={`${
                        openModal &&
                        "bg-transparent bottom-2 text-4xl md:text-6xl font-sans text-[#ececec] mb-4 lg:px-72 lg:mx-8 text-center"
                    } ${
                        !openModal && "text-2xl font-semibold"
                    } py-3 text-center`}
                >
                    {book[0]["chapterdetails"]
                        ? title
                        : `${name} - Chapter ${chapter_number}`}{" "}
                </p>
                <Audioplayer
                    currentTrack={url}
                    openModalHandler={openModalHandler}
                    sendData={sendData}
                    chapter_number={chapter_number}
                    book={book}
                    openModal={openModal}
                    audioRef={ARef}
                />

                {openModal && (
                    <div className=" md:hidden w-full h-16  flex  bg-opacity-75">
                        <div className="w-[25%]  h-full  flex items-center justify-center p-4">
                            <select
                                className="bg-transparent text-white p-1 pb-3 w-[90%]"
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
                            <FaHouseChimneyWindow size={32} />
                        </div>
                        <div className="w-[25%]  h-full  flex items-center justify-center">
                            <FaHouseChimneyWindow size={32} />
                        </div>
                        <div className="w-[25%]  h-full  flex items-center justify-center">
                            <GiContract
                                size={32}
                                onClick={openModalHandler}

                            />
                        </div>
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default Chapter;
