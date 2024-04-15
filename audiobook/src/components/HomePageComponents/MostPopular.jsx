import React from "react";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
    collection,
    query,
    where,
    getDocs,
    orderBy,
    limit,
} from "firebase/firestore";
import { db } from "../../firebase";

import ScrollCollection from "../Utils/ScrollCollection";
const API_BASE = "https://audioapi-euhq.vercel.app";

const MostPopular = ({ isLoading }) => {


    const auth = getAuth();
    const user = auth.currentUser;
    const [fetching, setFetching] = useState(true);

    const [mostPopularBooks, setMostPopularBooks] = useState([]);

    useEffect(() => {
        const fetchPopularBooks = async () => {
            const q = query(
                collection(db, "all-stats"),
                orderBy("listens", "desc"),
                limit(10)
            );

            const querySnapshot = await getDocs(q);
            const fetchPromises = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const book_name = doc.data()["name"];
                const fetchPromise = fetch(API_BASE + "/book/" + book_name)
                    .then((res) => res.json())
                    .then((res) => res[0])
                    .catch((err) => console.error(err));
                fetchPromises.push(fetchPromise);
            });

            const newItems = await Promise.all(fetchPromises);
            setMostPopularBooks(newItems);
            setFetching(false);
            console.log("Most Popular Books retrieved");
        };

        fetchPopularBooks();
    }, []);

    return (
        <div className="bg-zinc-50 dark:bg-d-bg-100 dark:text-white  w-full max-w-full md:px-5 md:py-3 p-2">
            {isLoading === true || fetching === true ? (
                <div className="flex flex-wrap   p-4 gap-6 md:gap-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="lg:h-[533px] lg:w-[250px] w-[140px] h-[315px] md:h[425] md:w-[200] lg:mx-5 md:mx-2 mx-1"
                        >
                            <div className="h-[75%]  bg-gray-200 dark:bg-d-bg-200 rounded-xl"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <Fragment>
                    <div className="flex">
                        <div className=" text-4xl font-semibold pointer-events-none p-4 dark:text-d-bg-600 font-eczar">
                            Most Popular Books Among Users
                        </div>

                        <div className="bg-stone-300 rounded-full h-5 w-5 text-center mt-2 cursor-pointer dark:text-black text-sm">
                            ?
                        </div>

                        </div>
                        
                        <ScrollCollection mostPopularBooks={mostPopularBooks} numbering={true}/>


                </Fragment>
            )}
        </div>
    );
};

export default MostPopular;
