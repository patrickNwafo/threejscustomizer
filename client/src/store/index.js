
import { proxy } from "valtio";

const state = proxy({
    intro: "true",
    selectedMaterial: "Material.001",
    activeMaterial: "Material.001",
    color: "#588157",
    color2: "#A3B18A",
    materials: {
        "Material.001": "#ffffff",
        "Material.003": "#000000",
        "Material.002": "#ffffff",
        "Material.007": "#588157",
    },
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: "./threejs.png",
    fullDecal: "./threejs.png",
});

export default state;