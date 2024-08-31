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

import { RiDeleteBinFill } from "react-icons/ri";


export const LibraryHistory = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const retrieveData = async () => {
            const q = query(
                collection(db, "users", user.uid, "history"),
                orderBy("at", "desc"),
                limit(8)
            );

            const querySnapshot = await getDocs(q);
            const myitems = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                myitems.push(doc.data());
                // fetchPromises.push(fetchPromise);
            });

            // const newItems = await Promise.all(fetchPromises);
            setItems(myitems);
            setLoading(false);
            console.log("Recent Books retrieved");
        };

        retrieveData();
    }, [user]);

    const timediff = (timestamp) => {
        const now = new Date();
        const setAt = new Date(timestamp.toDate());

        const diff = Math.abs(now - setAt);
        const weeks = Math.floor(diff / 604800000);
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (weeks > 0) {
            return weeks + " weeks";
        } else if (days > 0) {
            return days + " days";
        } else if (hours > 0) {
            return hours + " hours";
        } else {
            return minutes + " minutes";
        }
    };

    const handleDeleteHistory = () => {
    }


    return (
        <div className="md:px-10 p-2 flex flex-col gap-8 min-h-[50vh]">
            {loading ? (
                <div>Loading...</div>
            ) : (
                items.map((item) => (
                    <div className="flex text-sm lg:text-xl font-semibold font-eczar dark:text-white">
                        <div className="flex-[65%] flex gap-2">
                            <div className="flex-[50%]">{item["name"]}</div>
                            <div className="flex-[50%]">Chapter: {item["chapter"]}</div>
                        </div>
                        <div className="flex-[35%] flex justify-between gap-4 lg:gap-6 items-center">

                            <div className="flex-[90%] flex justify-end items-center lg:text-xl text-xs">{timediff(item["at"])} ago</div>
                            <div
                            onClick={handleDeleteHistory}
                            className="hover:text-blue-400  flex-[10%] flex text-base items-center underline-offset-2 underline text-blue-500 cursor-pointer pt-0.5"
                        >
                            Delete
                        </div>
                            
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};
