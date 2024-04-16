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
            <div className=" bg-gradient-to-b from-slate-400 via-slate-500 to-slate-800 min-h-[20vh]  dark:bg-gradient-to-b dark:from-d-bg-500 dark:via-d-bg-200 dark:to-d-bg-100 md:min-h-[40vh] md:p-8 px-4 py-8">
                <div className="flex items-center justify-start h-full md:gap-16 gap-8">
                    <div className="md:p-4 p-2 rounded-full border-gray-400 border-8">
                        <HiMiniUser className="text-3xl dark:text-d-primary-500" size={window.innerWidth / 9} />
                    </div>

                    <div className="flex-col">
                        <h3 className="md:text-xl  font-semibold text-white mb-2 px-1">
                            Profile
                        </h3>
                        <h3 className="lg:text-8xl md:text-4xl text-3xl font-bold text-white mb-2">
                            {displayName}
                        </h3>
                        <h3 className="md:text-xl font-semibold text-white px-1">
                            {email}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHero;
