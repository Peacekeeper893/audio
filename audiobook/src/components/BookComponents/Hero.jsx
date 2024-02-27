import React, { Fragment } from "react";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
// import { ThemeProvider } from '@mui/material/styles';
import {  getDocs , where , query } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";



const Hero = ({ book, user ,sendData }) => {
    
    const [third, setThird] = useState(false);
    const [isStarted, setIsStarted] = useState("no");
    const handleAddShelf = async () => {


        addDoc(collection(db, "users", user.uid, "shelf"), {
            name: book[0]["name"]
        }).then(() => {
            console.log("Document successfully written!");
            setThird(true);
        }
        ).catch((error) => {
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
        const docRef = doc(db, "users", user.uid, "shelf", querySnapshot.docs[0].id);
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
                    console.log("Document data:", querySnapshot.docs[0].data());
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

    useEffect(() => {

        var currentURL = window.location.href;

        // Get data from local storage with the URL as the key
        var data = localStorage.getItem(currentURL);
    
        // If data exists, set the state to it
        if (data) {
            setIsStarted("yes");
        }

    }, []);

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
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const clientTop = document.documentElement.clientTop || 0;
            const top = rect.top + scrollTop - clientTop;
            const middle = top - (window.innerHeight / 2);
            window.scrollTo({ top: middle, behavior: 'smooth' });
        }

        
    }






    
    return (
        <Fragment>
            <div className="md:p-8 flex justify-start md:gap-9 dark:bg-d-bg-200 dark:text-white gap-4 p-4">
                <div className="md:h-[370px] md:w-[280px] md:min-w-[250px]  h-[190px] w-[190px]">
                    <img
                        src={book[0]["bookimg"]}
                        alt=""
                        className="w-full h-full object-fill"
                    />
                </div>

                <div>
                    <h1 className="md:text-4xl text-xl mb-2">{book[0]["name"]}</h1>
                    <p className="md:text-xl text-lg">{book[0]["author"]}</p>


                    <p className="mt-16 italic font-extralight max-w-[100%] max-h-[4.9em] overflow-hidden md:block hidden">{book[0]["about"]}</p>
                    
                    {/* // Create a button to add to shelf */}

                    {!third &&
                        <div className="flex justify-start mt-8">
                            <button className="bg-blue-500 hover:bg-blue-700 font-eczar text-white font-bold py-2 px-2 rounded border-black border-1 min-w-[20%]" onClick={handleAddShelf}>
                                Add to Shelf
                            </button>
                        </div>
                    }

                    {third && <div className="flex justify-start mt-8">
                        <button className="bg-red-500 hover:bg-red- font-eczar text-white font-bold py-2 px-2 rounded border-red-900 border-2 min-w-[20%]" onClick={handleRemoveShelf}>
                            Remove from Shelf
                        </button>
                    </div>
                    }

                    {/* // Create a button to play or resume playing */}
                    {
                        isStarted === "yes" && <div className="flex justify-start mt-5">
                        <button className=" bg-green-500 shadow-md shadow-indigo-700 text-white font-eczar font-bold py-2 px-8 min-w-[15%] rounded border-black border-1" onClick={handleResume}>
                            Resume
                        </button>

                    </div>
                    }

                    {
                        isStarted === "no" && <div className="flex justify-start mt-3">
                        <button className="shadow-sm shadow-green-400 bg-green-500 text-white font-eczar font-bold py-2 px-8 min-w-[15%] rounded border-black border-1 " onClick={handlePlay}>
                            Play
                            </button>
                        </div>
                    }
                </div>
            </div>
        </Fragment>
    );
};

export default Hero;
