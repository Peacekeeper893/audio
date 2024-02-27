import React, {  useEffect, useState } from "react";
import ChapterPlayer from "./ChapterPlayer";
import Hero from "./BookComponents/Hero";
import Navigation from "./BookComponents/Navigation";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import Navbar from "./Navbar";


import { auth } from "../firebase";
import LoadingScreen from "./LoadingScreen";
const API_BASE = "https://audioapi-euhq.vercel.app";

const Book = ({ loggedIn }) => {
    const { book_name } = useParams();

    // book_name = book_name.replaceAll('%20', ' ');
    const [chapter_number, setChapter_number] = useState("0");
    const [book, setbook] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Initialize loading state to true
    const [openModal, setOpenModal] = useState(false);
    const [user, setUser] = useState({})
    // const [similar, setSimilar] = useState([]);



    const openModalHandler = () => {
        setOpenModal((prev) => !prev);
    };

    const closeModalHandler = () => {
        setOpenModal(false);
    };
    const GetBook = () => {
        fetch(API_BASE + "/book/" + book_name)
            .then((res) => res.json())
            .then((data) => {
                setbook(data);
                setIsLoading(false);
            })
            .catch((err) => console.error(err))

    };

    useEffect(() => {


        setTimeout(() => {
            
        const user = auth.currentUser;
        setUser(user);
        }, 1000);

        GetBook();
        

    }, []);

    const sendData = (data) => {
        setChapter_number((prev) => data);
        // save this data to local storage
        // Get the current URL
        var currentURL = window.location.href;

        // Store data in local storage with the URL as the key
        localStorage.setItem(currentURL, data);

    };

    return (
        <div>
            {isLoading ? (
                <LoadingScreen/>
            ) : openModal ? (
                <Modal
                    closeModalHandler={closeModalHandler}
                    openModalHandler={openModalHandler}
                    book={book}
                />
            ) : (
                <div className="min-h-screen dark:bg-d-bg-200 dark:text-white">
                    <Navbar loggedIn={loggedIn} />

                    <Hero book={book} user={user} sendData={sendData} />

                    {!loggedIn ? (
                        <div className="text-center py-16 h-full dark:bg-d-bg-200 dark:text-white">
                            Please Log-In to listen to this audiobook
                        </div>
                    ) : (
                        <Navigation
                            sendData={sendData}
                            book={book}
                            chapter_number={chapter_number}
                        />
                    )}
                </div>
            )}

            {chapter_number !== "0" && (
                <div
                    className={`${!openModal && "sticky bottom-0"} ${
                        openModal &&
                        "absolute bottom-0 w-full text-white font-bold text-2xl"
                    }`}
                >
                    <ChapterPlayer
                        title={
                            chapter_number +
                            ". " +
                            book[0]["chapters"][parseInt(chapter_number) - 1][
                                "chapter_title"
                            ]
                        }
                        // url={`https://drive.google.com/uc?id=${
                        //     book[0]["chapters"][parseInt(chapter_number) - 1][
                        //         "url"
                        //     ]
                        //     }`}
                        url="https://audio.jukehost.co.uk/9y5bKrR3mmh99tCY0fNQ1xR2c9VT5rDq"
                        openModalHandler={openModalHandler}
                        openModal={openModal}
                        book={book}
                        chapter_number={chapter_number}
                        sendData={sendData}
                    />
                </div>
            )}
        </div>
    );
};

export default Book;
