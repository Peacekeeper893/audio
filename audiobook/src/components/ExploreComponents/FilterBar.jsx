import React from "react";

import { useState, useEffect } from "react";
import LoadingScreen from "../Utils/LoadingScreen";

const FilterBar = ({
    bookLoading,
    loading,
    options,
    selectedFilters,
    setSelectedFilters,
    onFilterChange,
    authors,
    selectedAuthor,
    setSelectedAuthor,
    onAuthorChange,
    genreParam,
    authorParam,
}) => {
    const handleFilterChange = (filter) => {
        const updatedFilters = selectedFilters.includes(filter)
            ? selectedFilters.filter((f) => f !== filter)
            : [...selectedFilters, filter];
        setSelectedFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    const handleAuthorChange = (chosenAuthor) => {

        selectedAuthor === chosenAuthor ? setSelectedAuthor(null) : setSelectedAuthor(chosenAuthor);

        selectedAuthor === chosenAuthor ?onAuthorChange(null) : onAuthorChange(chosenAuthor);

        
    };

    // console.log(selectedAuthor , selectedFilters)

    // useEffect(() => {



    //     if (loading === false && bookLoading === false) {


    //         if (genreParam) {
    //             console.log("Genre Param: ", genreParam);
    //             handleFilterChange(genreParam);
    //         }

    //         if (authorParam) {
    //             console.log("Author Param: ", authorParam);
    //             handleAuthorChange(authorParam);
    //         }

    //     }

        


    // },[loading , bookLoading]  );

        console.log(selectedAuthor , selectedFilters)
    

    return (
        <>
            {loading && bookLoading ? (
                <LoadingScreen />
            ) : (
                <div className="md:px-2 md:py-3 flex flex-col gap-3 dark:text-d-bg-600">
                    <div className="font-eczar text-3xl py-4 font-bold">
                        Filters
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="text-base font-semibold underline">
                            By Genre
                        </div>

                        <div
                            className="cursor-pointer pr-4 text-sm text-cyan-600 hover:underline"
                            onClick={() => {
                                setSelectedFilters([]);
                                onFilterChange([]);
                                setSelectedAuthor(null);
                                onAuthorChange(null);
                            }}
                        >
                            Reset All
                        </div>
                    </div>

                    <ul className="">
                        {options.map((option) => (
                            <li key={option} className="py-1.5">
                                <label className="px-3 flex">
                                    <input
                                        type="checkbox"
                                        checked={selectedFilters.includes(
                                            option
                                        )}
                                        onChange={() =>
                                            handleFilterChange(option)
                                        }
                                        disabled={selectedAuthor !== undefined && selectedAuthor !== null}
                                    />
                                    <p className="px-3">{option}</p>
                                </label>
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-between items-center">
                        <div className="text-base font-semibold underline">
                            By Author
                        </div>

                    </div>

                    <ul className="">
                        {authors.map((author) => (
                            <li key={author} className="py-1.5">
                                <label className="px-3 flex">
                                    <input
                                        type="radio"
                                        checked={selectedAuthor === author}
                                        onChange={() =>
                                            handleAuthorChange(author)
                                        }
                                        disabled={selectedFilters.length > 0}
                                    />
                                    <p className="px-3">{author}</p>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default FilterBar;
