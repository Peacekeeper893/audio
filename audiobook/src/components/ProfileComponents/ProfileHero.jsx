import React from "react";
import { HiMiniUser } from "react-icons/hi2";
import { getAuth } from "firebase/auth";

const ProfileHero = () => {

    const auth = getAuth();
    const user = auth.currentUser;
    let displayName = "User";
    let email = "User";

    if (user !== null) {
        displayName = user.displayName;
        email = user.email;
    }



    return (
        <div>
            <div className="bg-gray-800 dark:bg-gradient-to-b from-d-bg-500 via-d-bg-200 to-d-bg-100 h-64 p-8">
                <div className="flex items-center justify-start h-full gap-16">
                    <div className="p-4 rounded-full border-gray-400 border-8">
                        <HiMiniUser className="text-3xl dark:text-d-primary-500" size={80} />
                    </div>

                    <div className="flex-col">
                        <h3 className="text-xl font-semibold text-white mb-2 px-1">
                            Profile
                        </h3>
                        <h3 className="text-8xl font-bold text-white mb-2">
                            {displayName}
                        </h3>
                        <h3 className="text-xl font-semibold text-white px-1">
                            {email}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHero;
