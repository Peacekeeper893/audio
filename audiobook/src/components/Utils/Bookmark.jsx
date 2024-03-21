import React from "react";
import chapters from './../../data/hp4';
import { serverTimestamp } from 'firebase/firestore';
import { RiDeleteBinFill } from "react-icons/ri";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";


const Bookmark = ({ bookmark, book ,onDelete,playBookmark }) => {

    const auth = getAuth();
    const user = auth.currentUser;



    const handleDeleteBookmark = () => {

        const deleteBookmark = async () => {
            try {
                await deleteDoc(doc(db, "users", user.uid, "bookmarks", bookmark.id));
                console.log("Document successfully deleted!");
                onDelete(bookmark.id);
            } catch (e) {
                console.error("Error removing document: ", e);
            }
        };
        deleteBookmark();

    }

    const handleGoToBookmark = () => {

        playBookmark(parseInt(bookmark.chapter_number), bookmark.timestamp)

    }

    const formatTime = (time) => {
        if (time && !isNaN(time)) {
            const minutes = Math.floor(time / 60);
            const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
            const seconds = Math.floor(time % 60);
            const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${formatMinutes}:${formatSeconds}`;
        }
        return "00:00";
    };

    const timediff = (timestamp) => {

        const now = new Date();
        const setAt = new Date(timestamp.toDate());

        // console.log(now, setAt);
        const diff = Math.abs(now - setAt);
        const weeks = Math.floor(diff / 604800000);
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (weeks > 0) {
            return weeks + "weeks";
        }
        else if (days > 0) {
            return days + "days";
        } else if (hours > 0) {
            return hours + "hrs";
        } else {
            return minutes + "mins";
        }

    }


    return (
        <>
            <div className="w-full flex justify-between items-center ">
                <div className="flex gap-3 text-sm md:text-xl">
                    <div>{bookmark.chapter_number}.</div>
                    <div>{book[0]["chapters"][parseInt(bookmark.chapter_number)]["chapter_title"] }</div>
                </div>
                <div className="flex gap-3 items-center">
                    <div className="italic font-normal text-base lg:pr-8 pr-3">{timediff(bookmark.setAt)} ago</div>
                    <div>{formatTime(bookmark.timestamp)}</div>
                    <div onClick={handleGoToBookmark} className="underline underline-offset-2 font-medium text-blue-600 hover:text-blue-400 cursor-pointer text-lg">Visit</div>
                    <div onClick={handleDeleteBookmark} className="hover:scale-[1.1] pt-1"><RiDeleteBinFill/></div>
                    {/* <div>{book[0]["chapters"][parseInt(bookmark.chapter_number)]["chapter_title"] }</div> */}
                </div>
            </div>
        </>
    );
};

export default Bookmark;
