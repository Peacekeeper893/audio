import { serverTimestamp } from "firebase/firestore";
import React, { div,useState } from "react";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {

    const navigate = useNavigate();



    return (
        <div className="dark:bg-black dark:text-white min-h-[10vh] dark:bg-footer-gradient bg-footer-gradient-light relative">
            <img class="footer-white-mask__default dark:hidden " src="https://paperpillar.com/assets/images/footer-white-mask.png" alt="Footer White Mask - Paperpillar"/>
            <img class="footer-white-mask__default hidden dark:block " src="https://novelsounds-bucket-do.blr1.cdn.digitaloceanspaces.com/misc/footer-white-mask.png" alt="Footer White Mask - Paperpillar"/>
            <div className="  flex justify-between md:p-8 px-4 py-8 mt-8">
                {/* <div className="text-center font-eczar py-5"> Thank you for visiting us!!</div> */}

                <div className="flex-col z-[100]">


                    <div className=" font-eczar pb-4 underline underline-offset-4 font-semibold text-xl"> Follow Us On Socials</div>
                    <div className="flex gap-3 mb-3">
                        <FaTwitter className="text-3xl " />
                        <div className="text-lg">Twitter</div>
                    </div>
                    <div className="flex gap-3 mb-3">
                        <FaFacebook className="text-3xl " />
                        <div className="text-lg">Facebook</div>
                    </div>
                    <div className="flex gap-3">
                        <FaInstagram className="text-3xl " />
                        <div className="text-lg">Instagram</div>
                    </div>

                </div>
                <div className="flex-col text-right z-[100]">
                    <div className=" font-eczar pb-4 underline underline-offset-4 font-semibold text-lg"> Quick Links</div>
                    <div className=" font-eczar pb-2 text-lg cursor-pointer hover:scale-105 transition-all duration-400">
                        About Us
                    </div>
                    <div className=" font-eczar pb-2 text-lg"> Contact Us</div>
                    <a href="request">
                    <div className=" font-eczar pb-2 text-lg cursor-pointer hover:scale-105 transition-all duration-400 " >
                        
                        Request an Audiobook

                        </div>
                        </a>
                </div>
            </div>

            <img src="https://paperpillar.com/assets/images/footer-pattern-bg.png"  className="absolute bottom-0 h-[40vh] md:h-[70vh] w-full "></img>


        </div>
    );
};

export default Footer;
