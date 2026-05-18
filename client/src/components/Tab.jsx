import { useSnapshot } from "valtio";
import state from "../store";

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }) => {
    const snap = useSnapshot(state);

    if (isFilterTab) {
        return (
            <div
                key={tab.name}
                className={`filter-tab-pill ${isActiveTab ? "active" : ""}`}
                onClick={handleClick}
                style={isActiveTab ? { borderColor: snap.color, boxShadow: `0 4px 20px ${snap.color}55` } : {}}
                title={tab.name}
            >
                <img
                    src={tab.icon}
                    alt={tab.name}
                    className="w-6 h-6 object-contain"
                    style={isActiveTab ? { filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))" } : { opacity: 0.6 }}
                />
            </div>
        );
    }

    return (
        <div
            key={tab.name}
            className="tab-btn"
            onClick={handleClick}
            title={tab.name}
        >
            <img
                src={tab.icon}
                alt={tab.name}
                className="w-6 h-6 object-contain"
                style={{ opacity: 0.7 }}
            />
        </div>
    );
};

export default Tab;