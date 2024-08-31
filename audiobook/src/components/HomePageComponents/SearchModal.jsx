import React, { useEffect, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import ShortcutDisplay from "../Utils/ShortcutDisplay";

const API_BASE = "https://audioapi-euhq.vercel.app";

const SearchModal = ({ query }) => {
    const [res, setRes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);

        if (query !== "") {
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
        <div className="h-fit bg-white dark:bg-d-bg-200 dark:text-d-primary-300 absolute md:w-[26.5%] min-h-[90px]   text-center mt-2 pt-3 md:py-3 md:px-2 border-gray-300 border-[3px] grid rounded-lg w-[90%] z-10 ">
            {res.length === 0 || isLoading === true ? (
                <div className="self-center">No results available</div>
            ) : (
                res.map((b) => (
                    <div className="cursor-pointer" onClick={() => {
                        navigate(`/book/${b["name"]}`);
                    }}>
                        <ShortcutDisplay book={b} />
                        <div className="my-3 " />
                    </div>
                ))
            )}
        </div>
    );
};

export default SearchModal;
