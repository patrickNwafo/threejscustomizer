import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import config from "../config/config";
import state from "../store";
import { download, undoIcon, redoIcon, shareIcon } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { encodeStateToURL, loadStateFromURL } from "../config/shareUtils";
import useHistory, { pushHistory, undo, redo, canUndo, canRedo } from "../hooks/useHistory";
import { useToast } from "../components/Toast";

import { fadeAnimation, slideAnimation } from "../config/motion";
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from "../components";
import PatternPicker from "../components/PatternPicker";
import TextPicker from "../components/TextPicker";
import MODELS from "../config/models";


const Custormizer = () => {
    const snap = useSnapshot(state);
    const [file, setFile] = useState('');
    const [prompt, setPrompt] = useState('');
    const [generatingImg, setGeneratingImg] = useState(false);
    const [activeEditorTab, setActiveEditorTab] = useState("");
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false,
    });
    const { addToast, updateToast } = useToast();

    useHistory();

    useEffect(() => {
        loadStateFromURL();
    }, []);

    const isGroupModel = (MODELS[snap.activeModel]?.type === "group");

    const GroupNotice = ({ feature }) => (
        <div className="picker-panel" style={{ width: 200 }}>
            <p className="text-xs font-bold text-gray-800 mb-1">{feature} unavailable</p>
            <p className="text-[11px] text-gray-500 leading-relaxed">
                This model uses multiple material layers. Switch to <strong>T-Shirt</strong> to use {feature}.
            </p>
            <button
                className="mt-3 w-full text-xs font-semibold py-2 rounded-xl"
                style={{ background: "rgba(0,0,0,0.07)" }}
                onClick={() => { state.activeModel = "shirt"; setActiveEditorTab(""); }}
            >
                Switch to T-Shirt
            </button>
        </div>
    );

    const generateTabContent = () => {
        switch (activeEditorTab) {
            case "colorpicker":
                return <ColorPicker />;
            case "filepicker":
                if (isGroupModel) return <GroupNotice feature="File upload" />;
                return (
                    <FilePicker
                        file={file}
                        setFile={setFile}
                        readFile={readFile}
                    />
                );
            case "aipicker":
                if (isGroupModel) return <GroupNotice feature="AI generation" />;
                return (
                    <AIPicker
                        prompt={prompt}
                        setPrompt={setPrompt}
                        generatingImg={generatingImg}
                        handleSubmit={handleSubmit}
                    />
                );
            case "patternpicker":
                if (isGroupModel) return <GroupNotice feature="Patterns" />;
                return (
                    <PatternPicker
                        onSelect={(url) => {
                            pushHistory();
                            handleDecals("full", url);
                            setActiveEditorTab("");
                        }}
                    />
                );
            case "textpicker":
                if (isGroupModel) return <GroupNotice feature="Text overlay" />;
                return (
                    <TextPicker
                        onApply={(type, dataURL) => {
                            pushHistory();
                            handleDecals(type, dataURL);
                            setActiveEditorTab("");
                        }}
                    />
                );
            default:
                return null;
        }
    };

    const handleSubmit = async (type) => {
        if (!prompt) return addToast("Please enter a prompt first", "info");

        const toastId = addToast("Generating AI design...", "loading");
        try {
            setGeneratingImg(true);

            const backendUrl = import.meta.env.DEV
                ? config.development.backendUrl
                : config.production.backendUrl;

            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();

            if (!data.photo) throw new Error(data.message || "No image returned from AI");

            pushHistory();
            handleDecals(type, `data:image/png;base64,${data.photo}`);
            updateToast(toastId, "AI design applied!", "success");
        } catch (error) {
            updateToast(toastId, error.message || "AI generation failed", "error");
        } finally {
            setGeneratingImg(false);
            setActiveEditorTab("");
        }
    };

    const handleDecals = (type, result) => {
        const decalType = DecalTypes[type];
        state[decalType.stateProperty] = result;

        if (!activeFilterTab[decalType.filterTab]) {
            handleActiveFilterTab(decalType.filterTab);
        }
    };

    const handleActiveFilterTab = (tabName) => {
        switch (tabName) {
            case "logoShirt":
                state.isLogoTexture = !activeFilterTab[tabName];
                break;
            case "stylishShirt":
                state.isFullTexture = !activeFilterTab[tabName];
                break;
            default:
                state.isLogoTexture = true;
                state.isFullTexture = false;
                break;
        }

        setActiveFilterTab((prevState) => ({
            ...prevState,
            [tabName]: !prevState[tabName],
        }));
    };

    const readFile = (type) => {
        if (!file) return addToast("Please select a file first", "info");
        reader(file).then((result) => {
            extractDominantColor(result);
            pushHistory();
            handleDecals(type, result);
            setActiveEditorTab("");
            addToast(`${type === "logo" ? "Logo" : "Full texture"} applied!`, "success");
        });
    };

    const extractDominantColor = (dataURL) => {
        const img = new Image();
        img.src = dataURL;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = 50;
            canvas.height = 50;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, 50, 50);
            const data = ctx.getImageData(0, 0, 50, 50).data;
            let r = 0, g = 0, b = 0, count = 0;
            for (let i = 0; i < data.length; i += 16) {
                if (data[i + 3] > 128) {
                    r += data[i]; g += data[i + 1]; b += data[i + 2]; count++;
                }
            }
            if (count > 0) {
                const toHex = (v) => Math.round(v / count).toString(16).padStart(2, "0");
                pushHistory();
                state.color = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
            }
        };
    };

    const handleShare = () => {
        const url = encodeStateToURL();
        navigator.clipboard.writeText(url).then(() => {
            addToast("Share link copied to clipboard!", "success");
        }).catch(() => {
            addToast("Could not copy to clipboard", "error");
        });
    };

    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                    <motion.div
                        key="custom"
                        className="absolute top-0 left-0 z-10"
                        {...slideAnimation("left")}
                    >
                        <div className="flex items-center min-h-screen">
                            <div className="editortabs-container tabs">
                                {EditorTabs.map((tab) => (
                                    <Tab
                                        key={tab.name}
                                        tab={tab}
                                        handleClick={() =>
                                            setActiveEditorTab(
                                                activeEditorTab === tab.name ? "" : tab.name
                                            )
                                        }
                                    />
                                ))}
                                {generateTabContent()}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div className="absolute z-10 top-5 right-5 flex items-center gap-2" {...fadeAnimation}>
                        <div className="flex items-center gap-1 glassmorphism rounded-2xl px-2 py-2">
                            <button
                                title="Undo (⌘Z)"
                                onClick={() => undo()}
                                className="p-1.5 rounded-xl disabled:opacity-25 hover:bg-black/5"
                                disabled={!canUndo()}
                            >
                                <img src={undoIcon} alt="undo" className="w-4 h-4" />
                            </button>
                            <button
                                title="Redo (⌘⇧Z)"
                                onClick={() => redo()}
                                className="p-1.5 rounded-xl disabled:opacity-25 hover:bg-black/5"
                                disabled={!canRedo()}
                            >
                                <img src={redoIcon} alt="redo" className="w-4 h-4" />
                            </button>
                            <div className="w-px h-4 bg-black/10 mx-1" />
                            <button
                                title="Share"
                                onClick={handleShare}
                                className="p-1.5 rounded-xl hover:bg-black/5"
                            >
                                <img src={shareIcon} alt="share" className="w-4 h-4" />
                            </button>
                        </div>
                        <CustomButton
                            type="filled"
                            title="Go Back"
                            handleClick={() => (state.intro = true)}
                            customStyles="w-fit px-4 py-2"
                        />
                    </motion.div>

                    <motion.div className="filtertabs-container" {...slideAnimation("up")}>
                        {/* Model switcher */}
                        <div className="flex items-center gap-1 glassmorphism rounded-2xl px-2 py-1.5">
                            {Object.values(MODELS).map((m) => (
                                <button
                                    key={m.id}
                                    title={m.label}
                                    onClick={() => { pushHistory(); state.activeModel = m.id; }}
                                    className="px-2.5 py-1 rounded-xl text-xs font-semibold transition-all"
                                    style={snap.activeModel === m.id
                                        ? { background: "rgba(0,0,0,0.7)", color: "#fff" }
                                        : { color: "#555" }
                                    }
                                >
                                    {m.emoji} {m.label}
                                </button>
                            ))}
                        </div>

                        <div className="w-px h-7 bg-black/10" />

                        {FilterTabs.map((tab) => (
                            <Tab
                                key={tab.name}
                                tab={tab}
                                isFilterTab
                                isActiveTab={activeFilterTab[tab.name]}
                                handleClick={() => handleActiveFilterTab(tab.name)}
                            />
                        ))}
                        <button
                            className="download-btn"
                            onClick={() => { downloadCanvasToImage(); addToast("Image downloaded!", "success"); }}
                        >
                            <img
                                src={download}
                                alt="download_image"
                                className="w-3/5 h-3/5 object-contain"
                            />
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Custormizer
