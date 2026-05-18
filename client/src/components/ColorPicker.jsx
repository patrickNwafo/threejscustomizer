
import { useRef } from "react"
import { SketchPicker } from "react-color"
import { useSnapshot } from "valtio"

import state from "../store"
import { pushHistory } from "../hooks/useHistory"

const presetColors = [
    "#ccc", "#EFBD4E", "#80C670", "#726DE8",
    "#EF674E", "#353934", "#2CCCE4", "#ff8a65",
    "#7098DA", "#C84B31", "#FFFFFF", "#000000",
];

function ColorPicker() {
    const snap = useSnapshot(state);
    const debounceRef = useRef(null);

    const handleChange = (color) => {
        state.color = color.hex;
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => pushHistory(), 500);
    };

    return (
        <div className="absolute ml-3 left-full top-0">
            <SketchPicker
                color={snap.color}
                disableAlpha
                presetColors={presetColors}
                onChange={handleChange}
            />
        </div>
    )
}

export default ColorPicker