import { motion, AnimatePresence } from "framer-motion"
import { useSnapshot } from "valtio"
import state from "../store";
import { CustomButton } from "../components";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from "../config/motion";
import Button from "../components/Button";


const Home = () => {
  const snap = useSnapshot(state);

  const goToAboutUs = () => {
    window.location.href = "https://chapati.studio/#" // Navigate to the About Us section with a URL fragment

  };

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation("left")}>

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="xl:text-[10rem] text-[4rem] lg:text-[6rem] xl:leading-[11rem] leading-[7rem] font-black text-[#344E41]">
                chapati
              </h1>
            </motion.div>
            <motion.div {...headContentAnimation} className="flex flex-col gap-5">

              <div className="flex items-center space-x-3">
                <p className="max-w-md text-base font-normal text-black md:w-96">
                  physical music has guided humans for civilizations, before; and into the future. david & goliath; streaming & tape
                </p>
                <p className="text-8xl text-[#588157]">
                  రోటీ
                </p>
              </div>

              <div className="flex space-x-3">
                <p className="max-w-md text-base font-normal text-black md:w-96">lithograph j-cards, custom color cassette bodies, high-fidelity tape loaded by hand. the idea is; each cassette is created with care. each is a moment of peace; a dip into the earth; a space to connect outward.
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
                  customStyles="w-fit px-4 py-2.5 font-bold text-md "
                />
                <Button
                  type="filled"
                  title="about us"
                  handleClick={goToAboutUs}
                  customStyles="w-fit px-4 py-2.5 font-bold text-md bg-[#588157]"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home