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


const BookDisplay = ({ name, author, bookimg, progress }) => {
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
                    let p = (parseInt(docSnap.data()["chapter"]) ) / parseInt(docSnap.data()["total"]) * 100;
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
                className="hidden md:block lg:h-[533px] lg:w-[280px] w-[140px] h-[315px] md:h[425px] md:w-[200px] my-3 hover:shadow-lg  shadow-slate-900 dark:shadow-d-bg-400 hover:px-3  p-4 rounded-xl"
            >
                <div className="h-[75%] mb-2 relative">
                    {progress && (
                        <div className="absolute top-1 right-1   font-bold text-7xl  h-12 w-12 text-purple-800">
                            <CircularProgressbar
                                background={true}
                                strokeWidth={12}
                                value={percent}
                                text={`${percent}%`}
                                styles={buildStyles({
                                    // Rotation of path and trail, in number of turns (0-1)
                                    // rotation: 0.25,

                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: "butt",

                                    // Text size
                                    textSize: "28px",

                                    // How long animation takes to go from one percentage to another, in seconds
                                    pathTransitionDuration: 0.5,

                                    // Can specify path transition in more detail, or remove it entirely
                                    // pathTransition: 'none',

                                    // Colors
                                    pathColor: `rgba(212, 22, 229)`,
                                    textColor: "#000",
                                    trailColor: "#000",
                                    backgroundColor: "#fff",
                                })}
                            />
                        </div>
                    )}
                    <img
                        src={bookimg}
                        alt="img"
                        className="object-fit h-[240px] w-[140px] lg:h-[400px] lg:w-[290px] md:h[375px] md:w-[200px]"
                    />
                </div>
                <div className="h-[25%] flex flex-col">
                    <p className="flex-[40%] overflow-clip  hover:overflow-visible overflow-ellipsis whitespace-nowrap  lg:text-xl hover:whitespace-normal md:text-md text-md mt-8 mb-2 font-semibold hover:text-cyan-400 dark:hover:text-d-primary-500">
                        {name}
                    </p>
                    <p className="text-sm flex-[60%] dark:text-d-bg-600">{author}</p>
                </div>
            </motion.div>

            <div className="md:hidden lg:h-[533px] lg:w-[250px] w-[160px] h-[315px] md:h[425] md:w-[200] my-3">
                <div className="h-[75%] mb-2">
                    <img
                        src={bookimg}
                        alt="img"
                        className="object-fit h-[240px] w-[160px] lg:h-[400px] lg:w-[250px] md:h[375] md:w-[200]"
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
