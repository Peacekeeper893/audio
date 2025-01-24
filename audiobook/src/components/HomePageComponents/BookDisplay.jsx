import React, { Fragment, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import {
    collection,
    query,
    where,
    getDocs,
    updateDoc,
} from "firebase/firestore";


import ImageLoader from "../Utils/ImageLoader";

const BookDisplay = ({ name, author, bookimg, progress, premium,index }) => {
    const [loading, setLoading] = useState(true);
    const [percent, setPercent] = useState(0);

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        const fetchProgress = async () => {
            // read from firebase
            const q = query(
                collection(db, "users", user.uid, "progress"),
                where("name", "==", name)
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
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    // console.log("Document data:", docSnap.data());
                    let p =
                        (parseInt(docSnap.data()["chapter"]) /
                            parseInt(docSnap.data()["total"])) *
                        100;
                    // console.log(p);
                    p = Math.round(p);
                    setPercent(p);
                    setLoading(false);
                } else {
                    console.log("No such document!");
                }
                // setThird(false);
            }
        };

        if (progress) {
            fetchProgress();
        }
    }, []);

    return (
        <Fragment>
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                onTap={{ scale: 0.95 }}
                className="hidden md:block
                h-[55vh] w-[18.5vw]
                hover:shadow-lg  shadow-slate-900 dark:shadow-d-bg-400 rounded-xl
                hover:px-3  p-4 my-1 "
                
            >
                <div className="h-[80%]  relative">
                    {progress && (
                        <div className="absolute top-1 right-1   font-bold text-7xl  h-[10%] w-10 text-purple-800">
                            <CircularProgressbar
                                background={true}
                                strokeWidth={12}
                                value={percent}
                                text={`${percent}%`}
                                styles={buildStyles({
                                    strokeLinecap: "butt",
                                    textSize: "28px",
                                    pathTransitionDuration: 0.5,
                                    pathColor: `rgba(212, 22, 229)`,
                                    textColor: "#000",
                                    trailColor: "#000",
                                    backgroundColor: "#fff",
                                })}
                            />
                        </div>
                    )}

                    <ImageLoader
                        src={bookimg}
                        classSettings="object-fit h-full w-full"
                    />

                    {premium && (
                        <img
                            class="mr-2 h-[15%] w-[15%] absolute top-1 left-1 "
                            src="https://v3img.voot.com/v3Storage/menu/jv/premium_icon.svg"
                            alt="premium_icon"
                        ></img>
                    )}
                </div>
                <div className="h-[20%] flex flex-col">
                    <p className="flex-1 overflow-clip  hover:overflow-visible overflow-ellipsis whitespace-nowrap   hover:whitespace-normal md:text-md text-md  font-semibold
                     hover:text-cyan-400 dark:hover:text-d-primary-500
                     mt-2">
                        {name}
                    </p>
                    <p className="text-sm flex-[30%] dark:text-d-bg-600">
                        {author}
                    </p>
                </div>
            </motion.div>

            <div className="md:hidden lg:h-[533px] lg:w-[250px] w-[160px] h-[315px] md:h[425] md:w-[200] my-3">
                <div className="h-[75%] mb-2">
                    {/* <img
                        src={bookimg}
                        alt="img"
                        className="object-fit h-[240px] w-[160px] lg:h-[400px] lg:w-[250px] md:h[375] md:w-[200]"
                    /> */}
                    <ImageLoader
                        src={bookimg}
                        classSettings="object-fit h-[240px] w-[160px] lg:h-[400px] lg:w-[250px] md:h[375] md:w-[200]"
                    />
                </div>
                <div className="h-[25%] ">
                    <p className="lg:text-xl md:text-lg text-md mb-2 font-semibold hover:text-cyan-400 dark:hover:text-d-primary-500">
                        {name}
                    </p>
                    <p className="text-sm dark:text-d-bg-600">{author}</p>
                </div>
            </div>
        </Fragment>
    );
};

export default BookDisplay;
