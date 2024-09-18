
import { proxy } from "valtio";

const state = proxy({
    intro: "true",
    selectedMaterial: "Material.011",
    activeMaterial: "Material.011",
    color: "#588157",
    color2: "#A3B18A",
    materials: {
        "Material.009": "#ffffff",
        "Material.010": "#000000",
        "Material.011": "#ffffff",
        "Material.012": "#588157",
    },
    isLogoTexture: true,
    isFullTexture: true,
    logoDecal: "./cassette-text.png",
    fullDecal: "./cassette-text.png",
    currentPage: "home",
});

export default state;