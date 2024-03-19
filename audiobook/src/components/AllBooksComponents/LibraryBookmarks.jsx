import React from "react";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";
import Bookmark from "../Utils/Bookmark";
import LibraryBookmark from "./LibraryBookmark";

const LibraryBookmarks = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    const [loading, setLoading] = useState(true);
    const [bookmarks, setBookmarks] = useState([]);

    const deleteBookmark = (id) => {
        setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
    };

    const playBookmark = (bookName , chapter, timestamp) => {
        const turl = `/miniplayer/${bookName}?ch=${chapter}&time=${timestamp}`;
        const newWindow = window.open(turl, "_blank", "width=500,height=1024");

        const checkWindowClosed = setInterval(() => {
            if (newWindow.closed) {
                // setShowPlayer(true);

                clearInterval(checkWindowClosed);
            }
        }, 1800);
    };

    useEffect(() => {
        if (user && user.uid) {
            const checkBookInShelf = async () => {
                const q = query(collection(db, "users", user.uid, "bookmarks"));

                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        setBookmarks((prev) => {
                            const bookmarkExists = prev.some(
                                (bookmark) => bookmark.id === doc.id
                            );

                            if (!bookmarkExists) {
                                return [...prev, { ...doc.data(), id: doc.id }];
                            } else {
                                return prev;
                            }
                        });
                    });
                    setLoading(false);
                } else {
                    console.log("No such document!");
                    setLoading(false);
                }
            };

            setTimeout(() => {
                checkBookInShelf();
            }, 0);
        }
    }, []);

    return (
        <>
            {loading ? (
                <div className="flex justify-center py-12 ">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 text-center"></div>
                </div>
            ) : (
                <>
                    {bookmarks.length === 0 ? (
                        <div>
                            <h1 className=" text-2xl font-semibold flex justify-center pr-6  bg-slate-300">
                                No Bookmarks Saved
                            </h1>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 md:px-6 p-1 dark:text-white">
                            {bookmarks.map((bookmark) => (

                                <LibraryBookmark bookmark={bookmark} onDelete={deleteBookmark} playBookmark={playBookmark} />

                            ))}
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default LibraryBookmarks;
