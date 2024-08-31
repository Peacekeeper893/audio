import React from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "./Utils/LoadingScreen";
import Modal from "./Utils/Modal";
import ChapterPlayer from "./BookComponents/ChapterPlayer";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const API_BASE = "https://audioapi-euhq.vercel.app";

const MiniPlayer = ({ loggedIn, loading }) => {
    const { book_name } = useParams();

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    let time = 0;
    const chapter_number = parseInt(query.get("ch"));
    time = query.get("time");
    const [playerChapter, setPlayerChapter] = useState(chapter_number);

    const openModalHandler = () => {
        // do nothing
        window.close();
    };

    const closeModalHandler = () => {
        // do nothing

    };

    const [book, setbook] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Initialize loading state to true
    const GetBook = () => {
        fetch(API_BASE + "/book/" + book_name)
            .then((res) => res.json())
            .then((data) => {
                setbook(data);
                setIsLoading(false);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        GetBook();
    }, []);

    const sendDataMini = (chapter_number) => {
        setPlayerChapter(chapter_number);
    };

    return (
        <>
            {loading || isLoading ? (
                <LoadingScreen />
            ) : (
                <>
                    {!loggedIn ? (
                        <div className="flex items-center justify-center h-screen flex-col">
                            <h1 className="text-4xl font-bold text-red-500">
                                You are not logged in
                            </h1>
                            <br></br>
                            <h1 className="text-4xl font-bold text-red-500">
                                Redirecting to home page...
                            </h1>
                        </div>
                    ) : (
                        <div className="min-h-screen flex flex-col text-white">


                            <Modal
                                closeModalHandler={closeModalHandler}
                                openModalHandler={openModalHandler}
                                book={book}
                                chapter_number={playerChapter}
                                sendData={sendDataMini}
                            />

                            {playerChapter !== "0" && (
                                <div
                                    className={` ${
                                        true &&
                                        "absolute bottom-0 w-full text-white font-bold text-2xl"
                                    }`}
                                >
                                    <ChapterPlayer
                                        title={
                                            playerChapter +
                                            ". " +
                                            book[0]["chapters"][
                                                parseInt(playerChapter) - 1
                                            ]["chapter_title"]
                                        }
                                        url={`https://audio.jukehost.co.uk/${
                                            book[0]["chapters"][
                                                playerChapter - 1
                                            ]["url"]
                                        }`}
                                        // url="https://novsound-ubukj-234.s3.amazonaws.com/WTCS/4.mp3"
                                        openModalHandler={openModalHandler}
                                        openModal={true}
                                        book={book}
                                        chapter_number={playerChapter}
                                                sendData={sendDataMini}
                                                isMiniPlayer={true}
                                                time={time}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default MiniPlayer;
