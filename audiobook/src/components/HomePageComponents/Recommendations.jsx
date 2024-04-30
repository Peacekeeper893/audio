import React from "react";
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
import DisplayBooksFromList from "../Utils/DisplayBooksFromList";

const API_BASE = "http://127.0.0.1:8000/api/getSimilar";

const Recommendations = ({ size }) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const [recommendations, setRecommendations] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetching, setFetching] = useState(true);
    const [timedout, setTimedout] = useState(false);

    useEffect(() => {
        const retrieveData = async () => {
            const q = query(
                collection(db, "users", user.uid, "recent"),
                orderBy("timestamp", "desc"),
                limit(size ? size : 6)
            );

            const querySnapshot = await getDocs(q);
            const recentBooks = [];
            querySnapshot.forEach((doc) => {
                const book_name = doc.data()["name"];
                recentBooks.push(book_name);
            });

            setItems(recentBooks);
            setLoading(false);
            console.log("Recent Books retrieved");
        };

        retrieveData();
    }, [user]);

    let timeoutId;

    useEffect(() => {
        const fetchRecommendations = async () => {
            let recommendedBooks = [];

            const fetchPromises = items.map((bookName) => {
                return fetch(API_BASE + "?name=" + bookName)
                    .then((res) => res.json())
                    .then((data) => {
                        data.slice(0, 2).forEach((book) => {
                            if (!recommendedBooks.includes(book)) {
                                recommendedBooks = [...recommendedBooks, book]; // Create a new array
                            }
                        });
                    })
                    .catch((err) => console.error(err));
            });

            await Promise.all(fetchPromises);

            console.log(recommendedBooks);
            setRecommendations(recommendedBooks);

            clearTimeout(timeoutId);
            setFetching(false);
        };

        if (loading == false && items.length > 0) {
            console.log("Fetching Recommendations");
            fetchRecommendations();

            timeoutId = setTimeout(() => {
                setTimedout(true);
            }, 8000); // Adjust this value as needed



        }
    }, [loading, items]);

    



    return (
        <>
            {timedout ? (
                <div></div>
            ) : (
                <div>
                    {loading || fetching || recommendations.length === 0 ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="w-full">
                            <DisplayBooksFromList
                                contents={recommendations}
                                fetching={fetching}
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Recommendations;
