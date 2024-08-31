import React, { Fragment } from "react";
import { useState, useEffect } from "react";
// import ePub from 'epubjs';
// import { Link } from "react-router-dom";
import { MdArrowDropDownCircle } from "react-icons/md";

// import hp3test from '../../data/hp3test.epub'
import { Link } from "react-router-dom";
const API_BASE = "https://audioapi-euhq.vercel.app";

const AboutBook = ({ about, bookName, bookTag, genres }) => {
    const [similar, setsimilar] = useState([]);
    const [info, setInfo] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [open, setOpen] = useState(true);

    console.log(genres);
    useEffect(() => {
        fetchSimilar();
    }, []);

    useEffect(() => {
        const fetchRecommendations = () => {
            const recommendationAPI =
                "http://127.0.0.1:8000/api/getRecommendations?name=" + bookName;

            console.log(recommendationAPI);

            fetch(recommendationAPI)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setRecommendations(data);
                })
                .catch((err) => console.error(err));
        };

        fetchRecommendations();
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
            <div
                className="md:px-12 md:py-6 px-6 py-2 lg:text-4xl text-3xl mt-2 font-semibold font-eczar underline underline-offset-4 description"
                id="description"
            >
                Overview
            </div>
            <div className=" md:px-12 md:pb-12 md:pt-6 pt-3 min-h-[30vh] dark:bg-d-bg-200 dark:text-white text-justify px-6 pb-6">
                {about}
            </div>

            <div className="flex md:p-12 md:pt-0 p-4 font-eczar items-center  w-full flex-wrap gap-3">
                <div className="text-2xl font-semibold underline underline-offset-4 md:mr-8">
                    Genres :
                </div>

                {genres.length === 0 ? (
                    <p>Not Available</p>
                ) : (
                    genres.map((genre, index) => (
                        <div
                            key={index}
                            className="border py-[3px] shadow-md cursor-pointer rounded-lg px-2 md:min-w-[6rem] text-center"
                        >
                            <Link to={`/books/${genre}`}>{genre}</Link>
                        </div>
                    ))
                )}
            </div>

            <div className="flex justify-between md:px-12 md:pb-12 p-4 mt-4 md:mt-0">
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

            <div className="md:px-12 md:pb-12 p-4">
                <div
                    className="flex justify-between"
                    onClick={() => {
                        setOpen((prev) => !prev);
                    }}
                >
                    <h2 className="text-2xl font-bold">You may also like:</h2>

                    <div>
                        <MdArrowDropDownCircle size={28} />
                    </div>
                </div>

                {open && (
                    <div className="flex flex-col gap-3 mt-5">
                        {recommendations.length === 0 ||
                        recommendations[0] ===
                            "Book not found. Please try again." ? (
                            <p>Not Available</p>
                        ) : (
                            <>
                                {recommendations.map(
                                    (recommendation, index) => (
                                        <div className="p-2 px-4 font-semibold rounded-md dark:bg-d-bg-300 bg-slate-200 flex justify-between">
                                            <div>{recommendation[0]}</div>
                                            <div>
                                                <div className="flex">
                                                    <p>Sim Score</p>
                                                    <p className="ml-2">
                                                        {Number(
                                                            recommendation[1]
                                                        ).toFixed(3)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}

                                <div className="italic text-sm mt-1">* Scores closer to 0 indicate higher similarity</div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </Fragment>
    );
};

// fetch details of book from google books api

export default AboutBook;
