
import { SketchPicker } from "react-color"
import { useSnapshot } from "valtio"

import state from "../store"


function ColorPicker() {
    const snap = useSnapshot(state);
    return (
        <div className=" absolute left-full ml-3">
            <SketchPicker
                color={snap.color}
                disableAlpha
                // presetColors={[
                //     "#EFBD4E",
                //     "#80C670",
                //     "#ccc",
                //     "#726DE8",
                //     "#FFF",
                //     "#222831",
                //     "#0C359E",
                //     "#FF8E8F",
                //     "#35374B",
                //     "#416D19",
                //     "#B4B4B8",
                //     "#FF8080",
                //     "#561C24",
                //     "#512314",
                //     "#5F123D"
                // ]}
                onChange={(color) => state.color = color.hex}
            />
        </div>
    )
}

export default ColorPicker