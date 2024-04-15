import React from "react";
import { Fragment, useRef } from "react";
import { useState, useEffect } from "react";

import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";

import { Link } from "react-router-dom";
import BookDisplayScrollable from "./BookDisplayScrollable";

const ScrollCollection = ({mostPopularBooks , numbering}) => {
    const scrollRef = useRef();

    const scroll = (scrollOffset) => {
        scrollRef.current.scrollTo({
            left: scrollRef.current.scrollLeft + scrollOffset,
            behavior: "smooth",
        });
    };

    return (
        <div className="relative">
            <div
                className="hidden md:block  absolute -left-3  top-[45%] transform -translate-y-[45%]  p-3 cursor-pointer rounded-full z-[50]"
                onClick={() => scroll(-600)}
            >
                <MdNavigateBefore
                    size={24}
                    className="dark:text-white text-black"
                />
            </div>
            <div
                className="absolute -right-3 top-[45%] transform -translate-y-[45%]  p-3 cursor-pointer rounded-full z-[50] hidden md:block"
                onClick={() => scroll(600)}
            >
                <MdNavigateNext className="dark:text-white" size={24} />
            </div>
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent dark:from-d-bg-100 dark:to-transparent z-[40]"></div>
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent dark:from-d-bg-100 dark:to-transparent z-[40]"></div>
            <div
                className="relative flex overflow-x-scroll horizontal-scrollbar md:p-4 gap-2 md:gap-2"
                ref={scrollRef}
            >
                {mostPopularBooks.map((book, i) => (
                    <Link to={`/book/${book["name"]}`}>
                        <BookDisplayScrollable
                            name={book["name"]}
                            author={book["author"]}
                            bookimg={book["bookimg"]}
                            numbering={numbering}
                            idx={i}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ScrollCollection;
