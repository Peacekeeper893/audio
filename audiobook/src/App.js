import Book from "./components/Book";
import Home from "./components/Home";
import Login from "./components/AuthScreens/Login";
import Signup from "./components/AuthScreens/Signup";

import { Routes, Route, Link } from "react-router-dom";

import { useState, useEffect, Fragment } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Navbar from "./components/Navbar";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                // ...
                console.log("uid", uid);
                setLoggedIn((prev) => true);
            } else {
                // User is signed out
                // ...
                console.log("user is logged out");
                setLoggedIn((prev) => false);
            }
        });
    }, []);

    return (
        <div className="App ">
            <Routes>
                <Route exact path="/" element={<Home loggedIn={loggedIn} />} />
                <Route
                    path="/book/:book_name"
                    element={
                        <Fragment>
                            <Book loggedIn={loggedIn} />
                        </Fragment>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/Signup" element={<Signup />} />
            </Routes>
        </div>
    );
}

export default App;
