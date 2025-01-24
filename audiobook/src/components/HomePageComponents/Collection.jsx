import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import BookDisplay from "./BookDisplay";
import ScrollCollection from "../Utils/ScrollCollection";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Collection = ({ heading, contents, isLoading, progress, isHome }) => {
    const { ref, inView } = useInView();

    return (
        <motion.div className=" bg-zinc-50 dark:bg-d-bg-100 dark:text-white  w-full max-w-full md:px-5 md:py-3 p-2"
        ref={ref}
            initial={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            animate={
                inView ? { opacity: 1, x: 0 } : { opacity: 0.2, x: -16 }
            }>
            <div
                className=" md:text-4xl text-3xl font-semibold pointer-events-none px-4 pt-4 dark:text-d-bg-600 font-eczar"
                id="hunger-games"
            >
                {heading}
            </div>

            <div className="flex flex-wrap px-4 py-2 md:px-0 gap-6 md:gap-2">
                {isLoading === true ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={index}
                            className="lg:h-[533px] lg:w-[250px] w-[140px] h-[315px] md:h[425] md:w-[200] "
                        >
                            <div className="h-[75%]  bg-gray-200 dark:bg-d-bg-200 rounded-xl"></div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-wrap">
                        {/* <ScrollCollection mostPopularBooks={contents} /> */}
                        {contents.map((book, index) => (
                            <Link to={`/book/${book["name"]}`}>
                                <BookDisplay
                                    name={book["name"]}
                                    author={book["author"]}
                                    bookimg={book["bookimg"]}
                                    progress={progress}
                                    isHome={isHome}
                                    premium={book["aws_hosted"]}
                                    index={index}
                                />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Collection;
