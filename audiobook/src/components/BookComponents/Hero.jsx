import React, { Fragment } from "react";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import Button from "../Utils/Button";
import { getDocs, where, query } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";
import ReactStars from "react-rating-stars-component";
import { IoMdShare } from "react-icons/io";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UseAnimations from "react-useanimations";
import Activity from "react-useanimations/lib/activity";

const Hero = ({ book, user, sendData, chapter_number }) => {
    const [third, setThird] = useState(false);
    const [isStarted, setIsStarted] = useState("no");

    // add and remove books from shelf

    const handleAddShelf = async () => {
        addDoc(collection(db, "users", user.uid, "shelf"), {
            name: book[0]["name"],
        })
            .then(() => {
                console.log("Document successfully written!");
                setThird(true);
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    };

    const handleRemoveShelf = async () => {
        const q = query(
            collection(db, "users", user.uid, "shelf"),
            where("name", "==", book[0]["name"])
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const docRef = doc(
                db,
                "users",
                user.uid,
                "shelf",
                querySnapshot.docs[0].id
            );
            await deleteDoc(docRef);
            console.log("Document successfully deleted!");
            setThird(false);
        } else {
            console.log("No such document!");
        }
    };

    useEffect(() => {
        if (book && user && user.uid) {
            const checkBookInShelf = async () => {
                const q = query(
                    collection(db, "users", user.uid, "shelf"),
                    where("name", "==", book[0]["name"])
                );

                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    // console.log("Document data:", querySnapshot.docs[0].data());
                    setThird(true);
                } else {
                    console.log("No such document!");
                    setThird(false);
                }
            };

            setTimeout(() => {
                checkBookInShelf();
            }, 0);
        }
    }, [book, user]);

    // Play / Resume Button
    useEffect(() => {
        if (chapter_number == 0) {
            var currentURL = window.location.href;

            var data = localStorage.getItem(currentURL);

            // If data exists, set the state to it
            if (data) {
                setIsStarted("yes");
            }
        } else setIsStarted("playing");
    }, [chapter_number]);

    // useEffect(() => {
    //     var currentURL = window.location.href;

    //     // Get data from local storage with the URL as the key
    //     var data = localStorage.getItem(currentURL);

    //     // If data exists, set the state to it
    //     if (data) {
    //         setIsStarted("yes");
    //     }
    // }, []);

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };

    const handlePlay = () => {
        // Get the current URL
        var currentURL = window.location.href;

        // Store data in local storage with the URL as the key
        localStorage.setItem(currentURL, "1");
        setIsStarted("playing");

        sendData(1);
    };

    const handleResume = () => {
        // Get the current URL
        var currentURL = window.location.href;

        // Get data from local storage with the URL as the key
        var data = localStorage.getItem(currentURL);

        // If data exists, set the state to it
        if (data) {
            setIsStarted("playing");
            sendData(parseInt(data));
        }

        const chapterElement = document.getElementById(data);

        // Scroll to chapter
        if (chapterElement) {
            const rect = chapterElement.getBoundingClientRect();
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
            const clientTop = document.documentElement.clientTop || 0;
            const top = rect.top + scrollTop - clientTop;
            const middle = top - window.innerHeight / 2;
            window.scrollTo({ top: middle, behavior: "smooth" });
        }
    };

    const notify = () => toast("Link Copied to ClipBoard!");

    return (
        <Fragment>
            <ToastContainer />

            <div className="md:p-8 flex flex-col md:flex-row md:justify-start items-center md:gap-9 dark:bg-d-bg-200 dark:text-white gap-4 p-4">
                <div className="md:h-[370px] md:w-[280px] md:min-w-[250px]  h-[250px] w-[190px]">
                    <img
                        src={book[0]["bookimg"]}
                        alt=""
                        className="w-full h-full object-fill"
                    />
                </div>

                <div>
                    <h1 className="md:text-4xl text-2xl mb-2 text-center md:text-left">
                        {book[0]["name"]}
                    </h1>
                    <a
                        href={`/author/${book[0]["author"]}`}
                        className="w-full "
                    >
                        <p className="md:text-xl text-md text-center md:text-left mb-4 md:mb-0">
                            {book[0]["author"]}
                        </p>
                    </a>

                    <p className="my-12 italic font-extralight max-w-[100%] max-h-[4.9em] overflow-hidden md:block hidden">
                        {book[0]["about"]}
                    </p>

                    <div className="flex md:flex-row flex-col-reverse items-center md:gap-4 justify-between gap-2">
                        <div className="md:w-[30%] w-full">
                            {/* // Create a button to add to shelf */}
                            {!third && (
                                <Button
                                    handleTask={handleAddShelf}
                                    desc={"Add to Shelf"}
                                />
                            )}
                            {third && (
                                <Button
                                    handleTask={handleRemoveShelf}
                                    desc={"Remove from Shelf"}
                                />
                            )}

                            {/* // Create a button to play or resume playing */}
                            {isStarted === "yes" && (
                                <Button
                                    handleTask={handleResume}
                                    desc={"Resume"}
                                />
                            )}
                            {isStarted === "no" && (
                                <Button handleTask={handlePlay} desc={"Play"} />
                            )}
                            {isStarted === "playing" && (
                                <div className="my-2 md:w-[80%] ">
                                    <div className="dark:bg-d-bg-300 font-eczar dark:text-white font-semibold py-2  rounded  border-2 px-8  w-full flex gap-2 justify-center">
                                        <div className="">
                                            <UseAnimations
                                                animation={Activity}
                                                size={26}
                                                strokeColor="#0099FF"
                                            />
                                        </div>
                                        <div>Playing</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex md:flex-col   items-center  ">
                            <div className="font-eczar -mb-2   px-5">
                                Rate this book:
                            </div>
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={24}
                                activeColor="#ffd700"
                            />

                            <div
                                className="mt-3 hover:scale-105 duration-500 cursor-pointer hidden md:flex items-center gap-2 dark:bg-d-bg-400 px-3 py-1 rounded-md dark:border-white border-2 font-bold"
                                onClick={() => {
                                    navigator.clipboard
                                        .writeText(window.location.href)
                                        .then(() => {
                                            // window.alert(
                                            //     "Text copied to clipboard"
                                            // );

                                            notify();
                                        })
                                        .catch((err) => {
                                            // This can happen if the user denies clipboard permissions:
                                            console.error(
                                                "Could not copy text: ",
                                                err
                                            );
                                        });
                                }}
                            >
                                Share {<IoMdShare className="mt-1" />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Hero;
