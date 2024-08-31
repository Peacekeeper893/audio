import React from "react";

import { useState, useEffect } from "react";

const MobileChapterList = ({ book, chapter_number,sendData }) => {
    const [nxtchapters, setNxtchapters] = useState([]);

    useEffect(() => {
        setNxtchapters(
            book[0]["chapters"].slice(
                chapter_number,
                book[0]["chapters"].length
            )
        );
    }, [chapter_number]);
    return (
        <div>
            {nxtchapters &&
                nxtchapters.map((chapter, index) => {
                    return (
                        <div
                            key={index}
                            className="text-gray-900 text-base flex w-full gap-4 hover:text-[0.9rem]  duration-300 my-6 pb-1 border-b-2 border-b-gray-900 dark:border-b-white dark:text-white"
                            onClick={() => {
                                sendData(chapter.chapter_number);
                            }}
                        >
                            <p> Chapter {chapter.chapter_number}.</p>
                            <p> {chapter.chapter_title}</p>
                        </div>
                    );
                })}
        </div>
    );
};

export default MobileChapterList;
