import React from "react";
import { Fragment } from "react";
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

import ScrollCollection from "../Utils/ScrollCollection";
import CollectionScrollableWrapper from "./CollectionScrollableWrapper";
const API_BASE = "https://audioapi-euhq.vercel.app";

const MostPopular = ({ isLoading }) => {


    const auth = getAuth();
    const user = auth.currentUser;
    const [fetching, setFetching] = useState(true);

    const [mostPopularBooks, setMostPopularBooks] = useState([]);

    useEffect(() => {
        const fetchPopularBooks = async () => {
            const q = query(
                collection(db, "all-stats"),
                orderBy("listens", "desc"),
                limit(10)
            );

            const querySnapshot = await getDocs(q);
            const fetchPromises = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const book_name = doc.data()["name"];
                const fetchPromise = fetch(API_BASE + "/book/" + book_name)
                    .then((res) => res.json())
                    .then((res) => res[0])
                    .catch((err) => console.error(err));
                fetchPromises.push(fetchPromise);
            });

            const newItems = await Promise.all(fetchPromises);
            setMostPopularBooks(newItems);
            setFetching(false);
            console.log("Most Popular Books retrieved");
        };

        fetchPopularBooks();
    }, []);

    return (

        <>
 

            <CollectionScrollableWrapper isLoading={isLoading} heading={"Most Popular Books Among Users"} displayBooks={mostPopularBooks} numbering={true} />
            
            </>
    );
};

export default MostPopular;
