import React, { useEffect, useState } from "react";
import ChapterPlayer from "./BookComponents/ChapterPlayer";
import Hero from "./BookComponents/Hero";
import Navigation from "./BookComponents/Navigation";
import { useParams } from "react-router-dom";
import Modal from "./Utils/Modal";
import Navbar from "./Navbar";
import { auth } from "../firebase";
import LoadingScreen from "./Utils/LoadingScreen";
import { getAuth } from "firebase/auth";
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    doc,
    deleteDoc,
    addDoc,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const API_BASE = "https://audioapi-euhq.vercel.app";

const Book = ({ loggedIn }) => {
    const { book_name } = useParams();

    const [chapter_number, setChapter_number] = useState("0");
    const [book, setbook] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Initialize loading state to true
    const [openModal, setOpenModal] = useState(false);
    const [user, setUser] = useState({});


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
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        setTimeout(() => {
            const user = auth.currentUser;
            setUser(user);
        }, 1000);

        GetBook();
    }, []);

    useEffect(() => {
        const handleRecord = async () => {

            try {
                if (book && user && user.uid) {
                    const q = query(
                        collection(db, "users", user.uid, "recent"),
                        where("name", "==", book[0]?.name)
                    );

                    let querySnapshot;
                    try {
                        querySnapshot = await getDocs(q);
                    } catch (e) {
                        console.log(e);
                    }
                    if (!querySnapshot.empty) {
                        const docRef = doc(
                            db,
                            "users",
                            user.uid,
                            "recent",
                            querySnapshot.docs[0].id
                        );
                        await updateDoc(docRef, {
                            timestamp: serverTimestamp(),
                        });
                        console.log("Document successfully updated!");
                        // setThird(false);
                    } else {
                        addDoc(collection(db, "users", user.uid, "recent"), {
                            name: book[0]["name"],
                            timestamp: serverTimestamp(),
                        })
                            .then(() => {
                                console.log(
                                    "Document successfully written to recent!"
                                );
                            })
                            .catch((error) => {
                                console.error("Error writing document: ", error);
                            });
                    }
                }
            
            } catch (e) {
                console.log(e);
            }
        }
        if (user && book) {
            setTimeout(() => {
                handleRecord();
            }, 8000);
        }
    }, [user, book]);

    const handleProgress = async (progress) => {
        if (book && user && user.uid) {
            const q = query(
                collection(db, "users", user.uid, "progress"),
                where("name", "==", book[0]["name"])
            );

            let querySnapshot;
            try {
                querySnapshot = await getDocs(q);
            } catch (e) {
                console.log(e);
            }
            if (!querySnapshot.empty) {
                const docRef = doc(
                    db,
                    "users",
                    user.uid,
                    "progress",
                    querySnapshot.docs[0].id
                );
                await updateDoc(docRef, {
                    chapter: progress,
                });
                console.log("Progress Document successfully updated!");
                // setThird(false);
            } else {
                addDoc(collection(db, "users", user.uid, "progress"), {
                    name: book[0]["name"],
                    chapter: progress,
                    total: book[0]["chapters"].length,
                })
                    .then(() => {
                        console.log(
                            "Document successfully written to progress!"
                        );
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
            }
        }
    };

    const sendData = (data) => {
        setChapter_number((prev) => data);
        var currentURL = window.location.href;
        // Store data in local storage with the URL as the key
        localStorage.setItem(currentURL, data);

        setTimeout(() => {
            if (user && book) {
                handleProgress(data);
            }
        }, 1000);
    };

    return (
        <div>
            {isLoading ? (
                <LoadingScreen />
            ) : openModal ? (
                <Modal
                    closeModalHandler={closeModalHandler}
                    openModalHandler={openModalHandler}
                        book={book}
                        
                />
            ) : (
                <div className="min-h-screen dark:bg-d-bg-200 dark:text-white">
                    <Navbar loggedIn={loggedIn} home={false} />
                    <hr className="dark:border-d-primary-300 border-d-bg-300" />

                    <Hero book={book} user={user} sendData={sendData} chapter_number={chapter_number} />

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
                        url={`https://audio.jukehost.co.uk/${
                            book[0]["chapters"][parseInt(chapter_number) - 1][
                                "url"
                            ]
                        }`}
                        // url="https://novsound-ubukj-234.s3.amazonaws.com/WTCS/4.mp3"
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
