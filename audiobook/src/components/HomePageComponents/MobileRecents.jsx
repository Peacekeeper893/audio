import React from "react";
import { useEffect, useState } from "react";
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
import BookDisplay from "../HomePageComponents/BookDisplay";
import Collection from "../HomePageComponents/Collection";
import { Link } from "react-router-dom";
const API_BASE = "https://audioapi-euhq.vercel.app";

const MobileRecents = ({ size }) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const retrieveData = async () => {
            const q = query(
                collection(db, "users", user.uid, "recent"),
                orderBy("timestamp", "desc"),
                limit(size ? size : 6)
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
            setItems(newItems);
            setLoading(false);
            console.log("Recent Books retrieved");
        };

        retrieveData();
    }, [user]);

    return (
        <div>
            {/* {loading ? <div>Loading...</div> :  console.log(items)} */}
            {/* {loading ? <div>Loading...</div> : items.map((item) => (<div> {item["name"]} </div>))} */}
            {/* <Collection contents={items} isLoading={loading} heading={"Recently Played"} progress={true} /> */}

            <div className="flex flex-wrap p-3 gap-x-5 gap-y-3 w-full my-8">
                {items.map((book) => (
                    <Link to={`/book/${book["name"]}`} className="w-[47%] bg-slate-200 dark:bg-d-bg-200 dark:text-gray-200 rounded-md h-14 flex">
                        <div className="flex-[30%] ">
                        <img
                        src={book["bookimg"]}
                        alt="img"
                        className="object-fit w-full h-full rounded-md"
                    />
                            </div>
                        <div className="flex-[70%] flex items-center h-14 overflow-clip  ">
                            <div className="text-xs font-semibold  py-1 px-2">{book["name"]}</div>
                            </div>
                    </Link>
                ))}
  
            </div>
        </div>
    );
};

export default MobileRecents;
