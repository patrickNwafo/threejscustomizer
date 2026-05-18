import { useSnapshot } from "valtio";
import state from "../store";
import { getContrastingColor } from "../config/helpers";

const CustomButton = ({ type, title, customStyles, handleClick }) => {
    const snap = useSnapshot(state);
    const generateStyle = (type) => {
        if (type === "filled") {
            return {
                backgroundColor: snap.color,
                color: getContrastingColor(snap.color),
            }
        } else if (type === "outline") {
            return {
                borderWidth: "1px",
                borderColor: snap.color,
                color: snap.color
            }
        }
    }
    return (
        <button
            className={`px-4 py-2 flex-1 rounded-xl font-semibold text-sm tracking-wide ${customStyles}`}
            style={{
                ...generateStyle(type),
                boxShadow: type === "filled" ? `0 4px 14px ${snap.color}66` : "none",
                transition: "box-shadow 0.2s ease, transform 0.15s ease",
            }}
            onClick={handleClick}
        >
            {title}
        </button>
    )
}

export default CustomButton