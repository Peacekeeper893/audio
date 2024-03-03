import { serverTimestamp } from "firebase/firestore";
import React, { Fragment,useState } from "react";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {

    const navigate = useNavigate();



    return (
        <Fragment>
            <div className=" bg-black text-white min-h-[10vh] flex justify-between p-8">
                {/* <div className="text-center font-eczar py-5"> Thank you for visiting us!!</div> */}
                <div className="flex-col ">

                    <div className=" font-eczar pb-4 underline underline-offset-4"> Follow Us On Socials</div>
                    <div className="flex gap-3 mb-3">
                        <FaTwitter className="text-3xl " />
                        <div className="">Twitter</div>
                    </div>
                    <div className="flex gap-3 mb-3">
                        <FaFacebook className="text-3xl " />
                        <div className="">Facebook</div>
                    </div>
                    <div className="flex gap-3">
                        <FaInstagram className="text-3xl " />
                        <div className="">Instagram</div>
                    </div>

                </div>
                <div className="flex-col">
                    <div className=" font-eczar pb-4 underline underline-offset-4"> Quick Links</div>
                    <div className=" font-eczar pb-2 cursor-pointer hover:scale-105 transition-all duration-500">
                        About Us
                    </div>
                    <div className=" font-eczar pb-2"> Contact Us</div>
                    <a href="request">
                    <div className=" font-eczar pb-2 cursor-pointer hover:scale-105 transition-all duration-500 " >
                        
                        Request an Audiobook

                        </div>
                        </a>
                </div>
            </div>

            <div className="bg-black text-white ">
                <div className=" font-eczar py-2 text-center">
                    Thank you for visiting us!!
                </div>
                <div className=" font-eczar pb-2 text-center"> © 2023-2024 NovelSounds</div>
            </div>
        </Fragment>
    );
};

export default Footer;
