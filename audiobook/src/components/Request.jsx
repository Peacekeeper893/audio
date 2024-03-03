import React from "react";
import Navbar from "./Navbar";
import LoadingScreen from "./Utils/LoadingScreen";
import Footer from "./HomePageComponents/Footer";

import { useState } from "react";

const Request = (loggedIn, loading) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [narrator, setNarrator] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here

        console.log("Request Submitted!")
    };

    return (
        <>
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

                        <div className=" dark:bg-d-bg-100 dark:text-white">
                            <form
                                onSubmit={handleSubmit}
                                className="bg-white shadow-md rounded px-8 pt-6 pb-8 my-24"
                            >
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="title"
                                    >
                                        Title* :
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="title"
                                        type="text"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="author"
                                    >
                                        Author :
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="author"
                                        type="text"
                                        value={author}
                                        onChange={(e) =>
                                            setAuthor(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="narrator"
                                    >
                                        Narrator :
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="narrator"
                                        type="text"
                                        value={narrator}
                                        onChange={(e) =>
                                            setNarrator(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <input
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="submit"
                                        value="Submit"
                                    />
                                </div>
                            </form>
                        </div>

                        <Footer />
                    </div>
                )}
            </>
        </>
    );
};

export default Request;
