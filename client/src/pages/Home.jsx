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

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")}>
            <p
              alt="logo"
              className="object-contain w-8 h-8 text-5xl text-[#588157]"
            >రోటీ</p>
          </motion.header>
          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                chapati
              </h1>
            </motion.div>
            <motion.div {...headContentAnimation} className="flex flex-col gap-5 ">
              <p className="max-w-md text-base font-normal text-black ">
                physical music has guided humans for civilizations, before; and into the future. david & goliath; streaming & tape
              </p>
              <p className="max-w-md text-base font-normal text-black">lithograph j-cards, custom color cassette bodies, high-fidelity tape loaded by hand. the idea is; each cassette is created with care. each is a moment of peace; a dip into the earth; a space to connect outward.
              </p>
              <div className="space-x-4">
                <CustomButton
                  type="filled"
                  title="design a cassette"
                  handleClick={() => state.intro = false}
                  customStyles="w-fit px-4 py-2.5 font-bold text-md"
                />
                <Button
                  type="filled"
                  title="about us"
                  handleClick={() => state.intro = false}
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