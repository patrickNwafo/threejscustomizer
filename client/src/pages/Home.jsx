import { motion, AnimatePresence } from "framer-motion"
import { useSnapshot } from "valtio"
import state from "../store";
import { CustomButton } from "../components";
import ModelPreview from "../components/ModelPreview";
import MODELS from "../config/models";
import { headContainerAnimation, headTextAnimation, slideAnimation } from "../config/motion";

const modelList = Object.values(MODELS);

const ModelCard = ({ model, isActive, onSelect, onCustomize }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -6 }}
    className="relative rounded-3xl overflow-hidden cursor-pointer flex flex-col"
    style={{
      background: isActive
        ? "rgba(0,0,0,0.85)"
        : "rgba(255,255,255,0.08)",
      border: isActive
        ? "2px solid rgba(255,255,255,0.3)"
        : "1px solid rgba(255,255,255,0.12)",
      backdropFilter: "blur(16px)",
      boxShadow: isActive ? "0 20px 60px rgba(0,0,0,0.4)" : "0 8px 32px rgba(0,0,0,0.2)",
    }}
    onClick={onSelect}
  >
    {isActive && (
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-emerald-500 text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        Selected
      </div>
    )}

    {/* 3D preview */}
    <div className="h-52 w-full">
      <ModelPreview modelConfig={model} color={isActive ? "#EFBD4E" : "#888"} />
    </div>

    {/* Info */}
    <div className="p-5 flex flex-col gap-3 flex-1">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{model.emoji}</span>
        <h3 className="font-bold text-white text-base">{model.label}</h3>
      </div>
      <p className="text-xs text-gray-400 leading-relaxed flex-1">{model.description}</p>

      <div className="flex gap-2 mt-1">
        <button
          onClick={(e) => { e.stopPropagation(); onCustomize(); }}
          className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white text-center transition-all"
          style={{ background: isActive ? "#EFBD4E" : "rgba(255,255,255,0.15)", color: isActive ? "#000" : "#fff" }}
        >
          {isActive ? "Customize →" : "Select"}
        </button>
      </div>
    </div>
  </motion.div>
);

const Home = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro && (
        // Full-screen scrollable overlay — canvas stays fixed behind
        <motion.div
          {...slideAnimation("left")}
          className="absolute inset-0 z-10 overflow-y-auto"
          style={{ scrollBehavior: "smooth" }}
        >
          {/* ── Hero Section ─────────────────────────── */}
          <section className="h-screen flex flex-col justify-between px-6 py-6 xl:px-16 xl:py-12 pointer-events-none">
            <motion.header {...slideAnimation("down")} className="pointer-events-auto">
              <img src="./threejs.png" alt="logo" className="w-8 h-8 object-contain" />
            </motion.header>

            <motion.div className="home-content pointer-events-auto" {...headContainerAnimation}>
              <motion.div
                {...headTextAnimation}
                className="rounded-3xl p-6 pb-5 w-full"
                style={{
                  background: "rgba(255,255,255,0.16)",
                  backdropFilter: "blur(24px) saturate(180%)",
                  WebkitBackdropFilter: "blur(24px) saturate(180%)",
                  border: "1px solid rgba(255,255,255,0.35)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.14)",
                }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
                  style={{ background: "rgba(255,255,255,0.5)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-gray-700 tracking-widest uppercase">3D Customizer</span>
                </div>

                <h1 className="head-text mb-5">LET'S <br className="xl:block hidden" /> DO IT.</h1>

                <p className="font-medium text-gray-800 text-sm leading-relaxed mb-5">
                  AI-powered 3D design studio. Pick a model,
                  change colors, upload textures or generate art with AI.
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <CustomButton
                    type="filled"
                    title="Start Designing →"
                    handleClick={() => (state.intro = false)}
                    customStyles="w-fit px-5 py-2.5 text-sm"
                  />
                </div>

                <div className="flex items-center flex-wrap gap-2">
                  {["AI Design", "Patterns", "Multi-Model"].map((f) => (
                    <span key={f} className="text-xs font-medium text-gray-700 flex items-center gap-1 bg-white/50 px-2.5 py-1 rounded-full">
                      <span className="text-emerald-500 font-bold">✓</span> {f}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              className="pointer-events-auto flex flex-col items-center gap-2 pb-4"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <span className="text-xs font-medium text-white/60 tracking-widest uppercase">Scroll to explore</span>
              <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </section>

          {/* ── Model Showcase Section ────────────────── */}
          <section
            className="min-h-screen px-6 py-16 xl:px-16"
            style={{ background: "rgba(5,5,5,0.88)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-12 text-center"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Choose your canvas</p>
              <h2 className="text-3xl xl:text-4xl font-black text-white">What are you designing today?</h2>
              <p className="text-sm text-gray-500 mt-3 max-w-md mx-auto">
                Select a 3D model to customize. Each model supports color changes, patterns, and AI-generated art.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {modelList.map((model) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  isActive={snap.activeModel === model.id}
                  onSelect={() => (state.activeModel = model.id)}
                  onCustomize={() => {
                    state.activeModel = model.id;
                    state.intro = false;
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-16 text-center"
            >
              <p className="text-xs text-gray-600 mb-3">Want to add your own 3D model?</p>
              <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                Drop any <code className="bg-white/10 px-1.5 py-0.5 rounded text-gray-300">.glb</code> file into{" "}
                <code className="bg-white/10 px-1.5 py-0.5 rounded text-gray-300">client/public/</code> and
                add its config to <code className="bg-white/10 px-1.5 py-0.5 rounded text-gray-300">src/config/models.js</code>.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-gray-500">
                <span>🎮 <a href="https://sketchfab.com/3d-models?features=downloadable" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Sketchfab</a></span>
                <span>🏗️ <a href="https://market.pmnd.rs" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Poimandres Market</a></span>
                <span>🌐 <a href="https://poly.pizza" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Poly Pizza</a></span>
                <span>🎨 <a href="https://quaternius.com" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Quaternius (free)</a></span>
                <span>🛒 <a href="https://www.turbosquid.com/Search/3D-Models/free/glb" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">TurboSquid free</a></span>
              </div>
            </motion.div>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Home