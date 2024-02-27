import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShortcutDisplay from "./ShortcutDisplay";

const API_BASE = "https://audioapi-euhq.vercel.app";

const SearchModal = ({ query }) => {
    const [res, setRes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        
        if (query !== "")
        {
            fetch(API_BASE + "/search/" + query)
            .then((res) => res.json())
            .then((data) => {
                setRes(data);
                setIsLoading(false);
            })
            .catch((err) => console.error(err));

        }

    }, [query]);

    return (
        <div className="h-fit bg-white dark:bg-d-bg-200 dark:text-d-primary-300 absolute md:w-[25%] min-h-[60px]  md:-ms-2 text-center mt-2 pt-3 md:py-3 md:px-1 border-gray-300 border-[3px] grid rounded-xl w-[88%] ">
            {res.length === 0 || isLoading === true ? (
                <div className="self-center">No results available</div>
            ) : (
                res.map((b) => (
                    <Link to={`book/${b["name"]}`}>
                        <ShortcutDisplay book={b} />
                        <div className="my-3 "  />
                            </Link>
                ))
            )}
        </div>
    );
};

export default SearchModal;
