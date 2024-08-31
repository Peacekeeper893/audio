import React from "react";
import { useEffect, useState } from "react";
import ChapterItem from "./ChapterItem";
import { auth } from "../../firebase";
import { db } from "../../firebase";

import {
    collection,
    query,
    where,
    getDocs,
    orderBy,
    limit,
} from "firebase/firestore";

const ChapterList = ({
    sendData,
    chapters,
    chapter_number,
    chapterdetails,
    host,
}) => {
    const user = auth.currentUser;

    const [locked, setLocked] = useState(false);

    useEffect(() => {
        const checkUserPrivileges = async () => {
            const q = query(
                collection(db, "super-users"),
                where("user_id", "==", user.uid)
            );
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                setLocked(true);
                console.log("Locked");
            }
        };

        if (host === true) {
            console.log("AWS Hosted");
            checkUserPrivileges();
        }
    }, []);

    return (
        <div className="relative">
            <div className="dark:bg-d-bg-200 py-4">
                {chapters.map((chapter) => (
                    <ChapterItem
                        key={chapter.chapter_number}
                        num={chapter.chapter_number}
                        title={chapter.chapter_title}
                        description={chapter.description}
                        sendData={sendData}
                        chapter_number={chapter_number}
                        chapterdetails={chapterdetails}
                    />
                ))}
            </div>
            {locked && (
                <div className="absolute top-6 left-0 h-full w-[99.5vw]  bg-d-bg-500 opacity-60"></div>
            )}
        </div>
    );
};

export default ChapterList;
