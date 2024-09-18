import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation
} from "../config/motion";
import { CustomButton } from "../components";
import Button from "../components/Button";
import state from "../store";

const AboutUs = () => {
    return (
        <motion.section className="absolute z-10 flex flex-col items-center justify-center w-screen h-screen p-6 xl:py-8 xl:px-36 sm:p-8 max-xl:gap-7 " {...slideAnimation("left")}>

            <motion.div className="flex flex-col justify-start flex-1 gap-10 xl:justify-center" {...headContainerAnimation}>
                <motion.div {...headTextAnimation}>
                    <h1 className="xl:text-[10rem] text-[4rem] lg:text-[6rem] xl:leading-[11rem] leading-[7rem] font-black text-[#344E41]">
                        chapati
                    </h1>
                </motion.div>

                <motion.div {...headContentAnimation} className="flex flex-col gap-5">
                    <div className="flex items-center space-x-3">
                        <p className="max-w-md text-base font-normal text-black md:w-96">
                            <span className="font-semibold text-black">why are we talking about bread?</span> bread has always been a part of our ability to connect with our families and culture. making roti with my own mother changed my approach to creating physical media. every texture is useful.
                        </p>
                        <p className="text-8xl text-[#588157]">
                            రోటీ
                        </p>
                    </div>

                    <div className="flex space-x-3">
                        <p className="max-w-md text-base font-normal text-black md:w-96">if you want to order, fill out the form below and we will let you know what we need. feel free to still design your cassette and send us a photo!
                        </p>
                        <div className="flex flex-col w-28">
                            <p>
                                au·di·o·tape
                                /ˈôdēōˌtāp/
                                noun
                            </p>
                            <ul className="">
                                <li>magnetic tape on which sound can be recorded.</li>
                            </ul>
                        </div>
                    </div>


                    <div className="flex space-x-8">
                        <CustomButton
                            type="filled"
                            title="design a cassette"
                            handleClick={() => state.intro = false}
                            customStyles="w-fit px-4 py-2.5 font-bold text-md h-16"
                        />
                        <Button
                            type="filled"
                            title="Contact us"
                            // handleClick={goToAboutUs}
                            customStyles="w-fit px-4 py-2.5 font-bold text-md bg-[#588157]"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </motion.section>

    );
};

export default AboutUs;