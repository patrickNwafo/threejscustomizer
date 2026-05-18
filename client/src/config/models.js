export const MODELS = {
    shirt: {
        id: "shirt",
        label: "T-Shirt",
        emoji: "👕",
        description: "Classic crew-neck tee — perfect canvas for logos, prints and AI art.",
        type: "mesh",           // single Mesh — supports decals
        file: "/shirt_baked.glb",
        node: "T_Shirt_male",
        material: "lambert1",
        logo: { position: [0, 0.04, 0.15], rotation: [0, 0, 0], scale: 0.15 },
        full: { position: [0, 0, 0], rotation: [0, 0, 0], scale: 1 },
    },
    cassette: {
        id: "cassette",
        label: "Cassette Tape",
        emoji: "📼",
        description: "Retro cassette tape — change the shell color and add a logo sticker to the front.",
        type: "group",          // Group with 4 primitives — color + logo decal on first child
        file: "/disk3.glb",
        node: "WHEELS",
        logo: { position: [0, 0, 0.06], rotation: [0, 0, 0], scale: 0.2 },
        full: { position: [0, 0, 0], rotation: [0, 0, 0], scale: 0.9 },
    },
};

export default MODELS;
