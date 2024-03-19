import React, { useState, useEffect, Fragment } from "react";
import BookDisplay from "./HomePageComponents/BookDisplay";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./HomePageComponents/Footer";
import ShortcutDisplay from "./Utils/ShortcutDisplay";
import SearchModal from "./HomePageComponents/SearchModal";
import { IoSearch } from "react-icons/io5";
// import LoadingScreen from "./LoadingScreen";
import Carousel from "./HomePageComponents/Carousel";
import Collection from "./HomePageComponents/Collection";
import Recent from "./ProfileComponents/Recent";
import MobileSearch from "./HomePageComponents/MobileSearch";
import MobileGreeting from "./HomePageComponents/MobileGreeting";

const API_BASE = "https://audioapi-euhq.vercel.app";

const Home = ({ loggedIn }) => {
    const [books, setBooks] = useState([]);
    const [hpbooks, setHpbooks] = useState([]);
    const [otherbooks, setOtherbooks] = useState([]); // Initialize loading state to true
    const [asoifbooks, setAsoifbooks] = useState([]);
    const [hgbooks, setHgbooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Initialize loading state to true
    const [searchmodal, setSearchmodal] = useState(false);
    const [lotrbooks, setLotrbooks] = useState([]); // Initialize loading state to true
    const [query, setQuery] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        GetBooks();
        GetHpbooks();
        GetHgbooks();
        GetAsoifbooks();
        GetLotrbooks();
        GetOtherBooks();
    }, []);

    const GetBooks = () => {
        fetch(API_BASE + "/books")
            .then((res) => res.json())
            .then((data) => {
                setBooks(data);
                setIsLoading(false);
            })
            .catch((err) => console.error(err));
    };

    const GetHpbooks = () => {
        fetch(API_BASE + "/books/harrypotter")
            .then((res) => res.json())
            .then((data) => {
                setHpbooks(data);
                setIsLoading(false);
            })
            .catch((err) => console.error(err));
    };
    const GetHgbooks = () => {
        fetch(API_BASE + "/books/hunger-games")
            .then((res) => res.json())
            .then((data) => {
                setHgbooks(data);
                setIsLoading(false);
            })
            .catch((err) => console.error(err));
    };
    const GetAsoifbooks = () => {
        fetch(API_BASE + "/books/asoif")
            .then((res) => res.json())
            .then((data) => {
                setAsoifbooks(data);
                setIsLoading(false);
            })
            .catch((err) => console.error(err));
    };

    const GetLotrbooks = () => {
        fetch(API_BASE + "/books/lotr")
            .then((res) => res.json())
            .then((data) => {
                setLotrbooks(data);
                setIsLoading(false);
            })
            .catch((err) => console.error(err));
    };

    const GetOtherBooks = () => {
        fetch(API_BASE + "/books/others")
            .then((res) => res.json())
            .then((data) => {
                setOtherbooks(data);
                setIsLoading(false);
            })
            .catch((err) => console.error(err));
    };

    const handleSearch = () => {
        setSearchmodal(true);
    };

    const handleBlur = () => {
        setTimeout(() => setSearchmodal(false), 250);
    };

    return (
        <Fragment>
            <Navbar loggedIn={loggedIn} home={true} />


            

            {/* Search bar for mobile displays */}

            <MobileSearch />

            <MobileGreeting/>

            <div className="dark:bg-d-bg-100 dark:text-white md:mt-8 mt-3 flex justify-center pl-2 bg-stone-100 py-8 ">
                {" "}
                <Carousel books={hpbooks} />
            </div>

            <div className=" bg-zinc-50 dark:bg-d-bg-100 dark:text-white flex  ">
                <div className=" md:flex-[75]  ">

                    <Recent size={3}/>
                </div>
                <div className="md:flex flex-col ml-2 flex-[25] hidden">

                    <div className="font-semibold text-2xl mt-6 mb-1">Recently Added</div>
                    <hr className="border-gray-500 " />
                    <div className=" mt-8 max-h-fit flex-col grid gap-10 md:gap-4">
                        {books.slice().reverse().slice(0,12).map((book) => (
                            <Link to={`book/${book["name"]}`}>
                                <ShortcutDisplay book={book} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <Collection heading="Harry Potter Books" contents={hpbooks} isLoading={isLoading} />

            <Collection
                heading="Lord of the Rings Books"
                contents={lotrbooks}
                isLoading={isLoading}
            />
            <Collection
                heading="A song of Ice and Fire Books"
                contents={asoifbooks}
                isLoading={isLoading}
            />
            <Collection
                heading="Hunger Games Books"
                contents={hgbooks}
                isLoading={isLoading}
            />
            <Collection
                heading="Other Titles"
                contents={otherbooks}
                isLoading={isLoading}
            />

            <Footer />
        </Fragment>
    );
};

export default Home;
