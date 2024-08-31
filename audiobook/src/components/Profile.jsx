import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ProfileHero from "./ProfileComponents/ProfileHero";
import Footer from "./HomePageComponents/Footer";
import ProfileContent from "./ProfileComponents/ProfileContent";
import MobileSearch from "./HomePageComponents/MobileSearch";
import LoadingScreen from "./Utils/LoadingScreen";

const Profile = ({ loggedIn, loading }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            const redirectTimeout = setTimeout(() => {
                navigate("/");
            }, 3000);

            return () => {
                clearTimeout(redirectTimeout);
            };
        }
    }, [loggedIn, navigate]);

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
                        <MobileSearch />
                                    
                            <Navbar loggedIn={loggedIn} home={true} />
                            <ProfileHero />
                            <ProfileContent />

                            <div className="flex-grow"></div>
                            <Footer />
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default Profile;
