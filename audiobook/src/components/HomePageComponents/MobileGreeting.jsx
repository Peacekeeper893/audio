import React from "react";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import Switcher from "../../Switcher";
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
        <div className="flex justify-between md:hidden">
            <div className="text-d-bg-600 h-12 mb-6 mt-1 p-6 text-2xl font-eczar font-semibold ">{`Good ${greeting}, ${user}`}</div>
            <div className="self-center p-6" title="Switch Theme">
                <Switcher />
            </div>
        </div>
    );
};

export default MobileGreeting;
