import React from "react";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";

const MobileGreeting = () => {

    const [greeting, setGreeting] = useState("Morning");
    const [user, setUser] = useState("User");



    const auth = getAuth();
    const userName = auth.currentUser;

    useEffect(() => {
        const date = new Date();
        const hours = date.getHours();

        if (hours >= 12 && hours < 17) {
            setGreeting("Afternoon");
        } else if (hours >= 17) {
            setGreeting("Evening");
        }

        const auth = getAuth();
        const userName = auth.currentUser;

        if (userName !== null) {
            setUser(userName.displayName.split(" ")[0]);
        }

    }, [userName]);

    return (
        <div className="text-d-bg-600 h-12 mb-6 mt-1 p-6 text-3xl font-eczar font-semibold md:hidden">{`Good ${greeting}, ${user}`}</div>
    );
};

export default MobileGreeting;
