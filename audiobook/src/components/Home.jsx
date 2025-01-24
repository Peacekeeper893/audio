import React, { useState, useEffect, Fragment } from "react";
import BookDisplay from "./HomePageComponents/BookDisplay";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./HomePageComponents/Footer";
import ShortcutDisplay from "./Utils/ShortcutDisplay";
import SearchModal from "./HomePageComponents/SearchModal";
import { IoSearch } from "react-icons/io5";
import LoadingPause from "./Utils/LoadingPause";
import Carousel from "./HomePageComponents/Carousel";
import Collection from "./HomePageComponents/Collection";
import Recent from "./ProfileComponents/Recent";
import MobileSearch from "./HomePageComponents/MobileSearch";
import MobileGreeting from "./HomePageComponents/MobileGreeting";
import MostPopular from "./HomePageComponents/MostPopular";
import GenreHomePage from "./HomePageComponents/GenreHomePage";
import CollectionScrollableWrapper from "./HomePageComponents/CollectionScrollableWrapper";
import MobileRecents from "./HomePageComponents/MobileRecents";
import Recommendations from "./HomePageComponents/Recommendations";

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

    const [genres, setGenres] = useState([]);

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

                let opt = [];

                data.forEach((book) => {
                    book.genres.forEach((genre) => {
                        if (!opt.includes(genre)) {
                            opt.push(genre);
                        }
                    });
                });

                setGenres(opt);
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
            {/* Search bar for mobile displays */}

            <MobileSearch />
            <MobileGreeting />
            <Navbar loggedIn={loggedIn} home={true} />

            <div className="block md:hidden">
                <MobileRecents />
            </div>

            <div className="dark:bg-d-bg-100 dark:text-white md:mt-2 mt-3  justify-center pl-0 bg-stone-100 py-2 hidden md:flex">
                <Carousel books={hpbooks} />
            </div>

            <div className=" bg-zinc-50 dark:bg-d-bg-100 dark:text-white md:flex hidden  ">
                <div className=" ">
                    <Recent size={5} />
                </div>

            </div>

            <MostPopular isLoading={isLoading} />

            <Recommendations />

            <CollectionScrollableWrapper
                isLoading={isLoading}
                heading="Featured: The Harry Potter Collection"
                displayBooks={hpbooks}
            />
            <GenreHomePage genres={genres} isLoading={isLoading} />

            <Collection
                heading="The Lord of the Rings Collection"
                contents={lotrbooks}
                isLoading={isLoading}
            />


            <CollectionScrollableWrapper
                isLoading={isLoading}
                heading="A song of Ice and Fire"
                displayBooks={asoifbooks}
            />
            <Collection
                heading="The Hunger Games Series"
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
