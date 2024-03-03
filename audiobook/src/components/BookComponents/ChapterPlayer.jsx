import React from "react";
import { Fragment } from "react";
import Audioplayer from "../AudioPlayerComponents/Audioplayer";

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
                        "bg-transparent bottom-4 text-4xl md:text-5xl font-sans text-[#ececec] mb-5 lg:px-72 lg:mx-9 text-center"
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
                />
            </div>
        </Fragment>
    );
};

export default Chapter;
