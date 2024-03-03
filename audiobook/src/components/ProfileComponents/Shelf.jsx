import React from "react";
import { useEffect , useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import BookDisplay from "../HomePageComponents/BookDisplay";
import Collection from "../HomePageComponents/Collection";
const API_BASE = "https://audioapi-euhq.vercel.app";

const Shelf = () => {
    // retrieve data from the firebase

    const auth = getAuth();
    const user = auth.currentUser;
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const retrieveData = async () => {
            const q = query(collection(db, "users", user.uid, "shelf"));

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
            setLoading(false)
        };

        retrieveData();
    }, [user]);

    return <div>
        {/* {loading ? <div>Loading...</div> :  console.log(items)} */}
        {/* {loading ? <div>Loading...</div> : items.map((item) => (<div> {item["name"]} </div>))} */}
        <Collection contents={items} isLoading={loading} heading={"Your Shelf"}/>
        
    </div>;
};

export default Shelf;