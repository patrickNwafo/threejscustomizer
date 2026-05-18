import state from "../store";

export const encodeStateToURL = () => {
    const params = new URLSearchParams({
        color: state.color,
        logo: state.isLogoTexture ? "1" : "0",
        full: state.isFullTexture ? "1" : "0",
    });
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
};

export const loadStateFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("color")) {
        const color = params.get("color");
        if (/^#[0-9A-Fa-f]{6}$/.test(color)) state.color = color;
    }
    if (params.has("logo")) state.isLogoTexture = params.get("logo") === "1";
    if (params.has("full")) state.isFullTexture = params.get("full") === "1";

    if (params.toString()) state.intro = false;
};
