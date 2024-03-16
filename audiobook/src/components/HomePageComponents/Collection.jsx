import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import BookDisplay from "./BookDisplay";

const Collection = ({ heading, contents, isLoading ,progress }) => {
    return (
        <div className=" bg-zinc-50 dark:bg-d-bg-100 dark:text-white  w-full max-w-full md:px-5 md:py-3 p-2">
            <div
                className=" text-4xl font-semibold pointer-events-none p-4 dark:text-d-bg-600 font-eczar"
                id="hunger-games"
            >
                {heading}
            </div>

            <div className="flex flex-wrap  p-4 gap-6 md:gap-2">
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
                    <Fragment>
                        {contents.map((book) => (
                            <Link to={`/book/${book["name"]}`}>
                                <BookDisplay
                                    name={book["name"]}
                                    author={book["author"]}
                                    bookimg={book["bookimg"]}
                                    progress={progress}
                                />
                            </Link>
                        ))}
                    </Fragment>
                )}
            </div>
        </div>
    );
};

export default Collection;
