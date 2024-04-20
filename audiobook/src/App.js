import Book from "./components/Book";
import Home from "./components/Home";
import Login from "./components/AuthScreens/Login";
import Signup from "./components/AuthScreens/Signup";
import HomeRedirect from "./components/HomeRedirect";
import Profile from "./components/Profile";
import AllBooks from "./components/AllBooks";
import Request from "./components/Request";
import Author from "./components/Author";
import MiniPlayer from "./components/MiniPlayer";
import Library from "./components/Library";
import GenreBooks from "./components/GenreBooks";

import { Routes, Route } from "react-router-dom";

import { useState, useEffect, Fragment } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
// import Navbar from "./components/Navbar";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading , setLoading] = useState(true);

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

            setLoading(false);
        });


    }, []);



    return (
        <div className="App ">
            <Routes>
                <Route exact path="/" element={<HomeRedirect loggedIn={loggedIn} loading={loading} />} />
                <Route
                    path="/book/:book_name"
                    element={
                        <Fragment>
                            <Book loggedIn={loggedIn} />
                        </Fragment>
                    }
                />
                <Route
                    path="/author/:author_name"
                    element={
                        <Fragment>
                            <Author loggedIn={loggedIn} loading={ loading}  />
                        </Fragment>
                    }
                />
                <Route
                    path="/miniplayer/:book_name/"
                    element={
                        <Fragment>
                            <MiniPlayer loggedIn={loggedIn} loading={loading}  />
                        </Fragment>
                    }
                />
                <Route path="/profile" element={<Profile loggedIn={loggedIn} loading={ loading} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/books" element={<AllBooks loggedIn={loggedIn} loading={loading} />} />
                <Route path="/books/:genre" element={<GenreBooks loggedIn={loggedIn} loading={loading} />} />
                <Route path="/request" element={<Request loggedIn={loggedIn} loading={loading} />} />
                <Route path="/library" element={<Library loggedIn={loggedIn} loading={loading} />} />

            </Routes>
        </div>
    );
}

export default App;
