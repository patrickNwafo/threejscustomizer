import { useEffect } from "react";
import state from "../store";

const MAX_HISTORY = 30;

const history = {
    past: [],
    future: [],
};

const captureSnapshot = () => ({
    color: state.color,
    isLogoTexture: state.isLogoTexture,
    isFullTexture: state.isFullTexture,
    logoDecal: state.logoDecal,
    fullDecal: state.fullDecal,
});

const applySnapshot = (snap) => {
    state.color = snap.color;
    state.isLogoTexture = snap.isLogoTexture;
    state.isFullTexture = snap.isFullTexture;
    state.logoDecal = snap.logoDecal;
    state.fullDecal = snap.fullDecal;
};

export const pushHistory = () => {
    history.past.push(captureSnapshot());
    if (history.past.length > MAX_HISTORY) history.past.shift();
    history.future = [];
};

export const undo = () => {
    if (history.past.length === 0) return;
    history.future.push(captureSnapshot());
    const prev = history.past.pop();
    applySnapshot(prev);
};

export const redo = () => {
    if (history.future.length === 0) return;
    history.past.push(captureSnapshot());
    const next = history.future.pop();
    applySnapshot(next);
};

export const canUndo = () => history.past.length > 0;
export const canRedo = () => history.future.length > 0;

const useHistory = () => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "z" && !e.shiftKey) {
                e.preventDefault();
                undo();
            }
            if ((e.metaKey || e.ctrlKey) && (e.key === "y" || (e.key === "z" && e.shiftKey))) {
                e.preventDefault();
                redo();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);
};

export default useHistory;
