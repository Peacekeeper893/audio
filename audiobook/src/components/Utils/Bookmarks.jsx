import React from "react";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";

import Bookmark from "./Bookmark";

const Bookmarks = ({ book, playBookmark }) => {
    const auth = getAuth();
    const user = auth.currentUser;

    const [loading, setLoading] = useState(true);
    const [bookmarks, setBookmarks] = useState([]);

    const deleteBookmark = (id) => {
        setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
    };

    useEffect(() => {
        if (book && user && user.uid) {
            const checkBookInShelf = async () => {
                const q = query(
                    collection(db, "users", user.uid, "bookmarks"),
                    where("name", "==", book[0]["name"])
                );

                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        // console.log(doc.id, " => ", doc.data());
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
        <div>
            {loading ? (
                <div className="flex justify-center py-12 ">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 text-center"></div>
                </div>
            ) : (
                <div className=" ">
                    {bookmarks.length === 0 ? (
                        <div className=" self-center my-[10vh]">
                            <h1 className=" text-2xl font-semibold flex justify-center self-center   p-6  bg-slate-300">
                                No Bookmarks Saved
                            </h1>
                        </div>
                    ) : (
                        <div className="flex flex-col overflow-y-scroll gap-4 md:p-4 p-1">
                            {bookmarks.map((bookmark) => (
                                <Bookmark
                                    bookmark={bookmark}
                                    book={book}
                                    onDelete={deleteBookmark}
                                    playBookmark={playBookmark}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Bookmarks;
