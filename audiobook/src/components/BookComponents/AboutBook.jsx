import React, { Fragment } from "react";
import { useState, useEffect } from "react";
// import ePub from 'epubjs';
// import { Link } from "react-router-dom";

// import hp3test from '../../data/hp3test.epub'
const API_BASE = "https://audioapi-euhq.vercel.app";

const AboutBook = ({ about, bookName, bookTag }) => {
    const [similar, setsimilar] = useState([]);
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetchSimilar();
    }, []);

    const fetchSimilar = () => {
        fetch(
            "https://www.googleapis.com/books/v1/volumes?q=" +
                bookName +
                "&maxResults=1"
        )
            .then((res) => res.json())
            .then((data) => {
                fetch(
                    "https://www.googleapis.com/books/v1/volumes/" +
                        data.items[0].id
                )
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        setInfo(data);
                    });
            })
            .catch((err) => console.error(err));
    };

    const fetchInfo = () => {
        fetch(API_BASE + "/book/" + bookName)
            .then((res) => res.json())
            .then((data) => {
                setInfo(data);
                // console.log(data);
            })
            .catch((err) => console.error(err));
    };

    return (
        <Fragment>
            <div className="md:px-12 md:py-6 px-6 py-2 lg:text-4xl font-semibold font-eczar underline underline-offset-4">
                Overview
            </div>
            <div className=" md:px-12 md:pb-12 md:pt-6 pt-3 min-h-[30vh] dark:bg-d-bg-200 dark:text-white text-justify px-6 pb-6">
                {about}
            </div>

            <div className="flex md:p-12 md:pt-0 p-4 font-eczar underline underline-offset-4 w-full flex-wrap">
                <div className="text-2xl font-semibold">Genres :</div>
            </div>

            <div className="flex justify-between md:px-12 md:pb-12 p-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold">About the Author</h2>
                    <p className="text-justify">
                        {info["volumeInfo"] && info["volumeInfo"]["authors"]
                            ? info["volumeInfo"]["authors"][0]
                            : ""}
                    </p>

                    <br />

                    <h2 className="text-2xl font-bold"> Publish Date</h2>
                    <p>
                        {info["volumeInfo"] &&
                        info["volumeInfo"]["publishedDate"]
                            ? info["volumeInfo"]["publishedDate"]
                            : ""}
                    </p>
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold">Publisher</h2>
                    <p className="text-justify">
                        {info["volumeInfo"] && info["volumeInfo"]["publisher"]
                            ? info["volumeInfo"]["publisher"]
                            : ""}
                    </p>

                    <br />

                    <h2 className="text-2xl font-bold"> Page count</h2>
                    <p>
                        {info["volumeInfo"] && info["volumeInfo"]["pageCount"]
                            ? info["volumeInfo"]["pageCount"]
                            : ""}
                    </p>
                </div>
            </div>


        </Fragment>
    );
};

// fetch details of book from google books api

export default AboutBook;
