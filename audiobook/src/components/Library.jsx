import React from "react";
import Navbar from "./Navbar";
import LoadingScreen from "./Utils/LoadingScreen";
import Footer from "./HomePageComponents/Footer";
import { useState, useEffect } from "react";
import LibraryHEader from "./AllBooksComponents/LibraryHEader";
import LibraryDisplay from "./AllBooksComponents/LibraryDisplay";
import MobileSearch from "./HomePageComponents/MobileSearch";
const Library = ({ loggedIn, loading }) => {
    const [selected, setSelected] = useState("Shelf");
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, []);

    return (
        <>
            {loading ? (
                <LoadingScreen />
            ) : (
                <>
                    {!loggedIn ? (
                        <div className="flex items-center justify-center h-screen flex-col">
                            <h1 className="text-4xl font-bold text-red-500">
                                You are not logged in
                            </h1>
                            <br></br>
                            <h1 className="text-4xl font-bold text-red-500">
                                Redirecting to home page...
                            </h1>
                        </div>
                    ) : (
                        <div className="min-h-screen flex flex-col">
                            <Navbar loggedIn={loggedIn} home={true} />
                        <MobileSearch />

                            <LibraryHEader
                                selected={selected}
                                setSelected={setSelected}
                                    />
                                    
                            <LibraryDisplay selected={selected} />

                            <div className="flex-grow"></div>
                            <Footer />
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default Library;
