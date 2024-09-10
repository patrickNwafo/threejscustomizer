import { useSnapshot } from 'valtio';
import state from '../store';

const MaterialButton = ({ material, label }) => {
    const snap = useSnapshot(state);

    const isActive = snap.activeMaterial === material; // Check if this material is active

    const handleClick = () => {
        state.activeMaterial = material; // Set the active material when clicked
    };

    return (
        <button
            onClick={handleClick}
            className={`
                py-2 px-4 rounded-lg font-semibold text-white transition-all duration-300 ease-in-out
                ${isActive ? 'bg-blue-600 scale-105 shadow-lg' : 'bg-gray-500 hover:bg-gray-700'}
            `}
        >
            {label}
        </button>
    );
};

export default MaterialButton;
